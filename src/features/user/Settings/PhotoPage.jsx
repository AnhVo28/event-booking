import React, { Component } from 'react';
import {
    Image,
    Segment,
    Header,
    Divider,
    Grid,
    Button,
    Card,
    Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { uploadProfileImage, deletePhoto } from '../userActions';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const actions = {
    uploadProfileImage,
    deletePhoto
};

const mapState = state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos
});

// Query in our firebase
const query = ({ auth }) => {
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{ collection: 'photos' }],
            // Save as photos props in redux firestore.ordered
            storeAs: 'photos'
        }
    ];
};

class PhotosPage extends Component {
    state = {
        files: [],
        fileName: '',
        cropResult: null,
        image: {}
    };

    onDrop = files => {
        this.setState({
            files,
            fileName: files[0].name
        });
    };

    uploadImage = async () => {
        try {
            await this.props.uploadProfileImage(
                this.state.image,
                this.state.fileName
            );
            this.cancelCrop();
            toastr.success('Success', 'Photo has been uploaded');
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    };

    handleDeletePhoto = photo => async () => {
        debugger;
        try {
            await this.props.deletePhoto(photo);
            toastr.success('Success', 'Photo has been deleted');
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    };

    cancelCrop = () => {
        this.setState({
            files: [],
            image: {}
        });
    };

    cropImage = () => {
        if (this.refs.cropper.getCroppedCanvas() === undefined) {
            return;
        }
        // get the new Url and new cropped img
        this.refs.cropper.getCroppedCanvas().toBlob(blob => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({
                cropResult: imageUrl,
                image: blob
            });
        });
    };

    render() {
        const { photos, profile } = this.props;

        console.log('photos: ', photos);
        let filteredPhotos;
        if (photos) {
            filteredPhotos = photos.filter(photo => {
                return photo.url !== profile.photoURL;
            });
        }

        return (
            <Segment>
                <Header dividing size="large" content="Your Photos" />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color="teal" sub content="Step 1 - Add Photo" />
                        <Dropzone onDrop={this.onDrop} multiple={false}>
                            <div
                                style={{
                                    paddingTop: '30px',
                                    textAlign: 'center'
                                }}
                            >
                                <Icon name="upload" size="huge" />
                                <Header
                                    style={{ padding: '0px 2px' }}
                                    content="Drop image here or click to add"
                                />
                            </div>
                        </Dropzone>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header
                            sub
                            color="teal"
                            content="Step 2 - Resize image"
                        />
                        {this.state.files[0] && (
                            <Cropper
                                style={{ height: 200, width: '100%' }}
                                ref="cropper"
                                src={this.state.files[0].preview}
                                aspectRatio={1}
                                viewMode={0}
                                dragMode="move"
                                guides={true}
                                scalable={true}
                                cropBoxMovable={true}
                                cropBoxResizable={true}
                                crop={this.cropImage}
                            />
                        )}
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header
                            sub
                            color="teal"
                            content="Step 3 - Preview and Upload"
                        />
                        {this.state.files[0] && (
                            <div>
                                <Image
                                    style={{
                                        minHeight: '200px',
                                        minWidth: '200px'
                                    }}
                                    src={this.state.cropResult}
                                />
                                <Button.Group>
                                    <Button
                                        onClick={this.uploadImage}
                                        style={{ width: '100px' }}
                                        positive
                                        icon="check"
                                    />
                                    <Button
                                        onClick={this.cancelCrop}
                                        style={{ width: '100px' }}
                                        icon="close"
                                    />
                                </Button.Group>
                            </div>
                        )}
                    </Grid.Column>
                </Grid>

                <Divider />
                <Header sub color="teal" content="All Photos" />

                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src={profile.photoURL} />

                        <Button positive>Main Photo</Button>
                    </Card>
                    {photos &&
                        filteredPhotos.map(photo => (
                            <Card key={photo.id}>
                                <Image src={photo.url} />
                                <div className="ui two buttons">
                                    <Button basic color="green">
                                        Main
                                    </Button>
                                    <Button
                                        onClick={this.handleDeletePhoto(photo)}
                                        basic
                                        icon="trash"
                                        color="red"
                                    />
                                </div>
                            </Card>
                        ))}
                </Card.Group>
            </Segment>
        );
    }
}

export default compose(
    connect(
        mapState,
        actions
    ),
    firestoreConnect(auth => query(auth))
)(PhotosPage);
