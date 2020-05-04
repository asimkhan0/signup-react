import React, { useState, useEffect, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import Modal from '../modal/index';
import 'react-image-crop/dist/ReactCrop.css';
import './styles/imageUpload.css';

export default function ImageCropLoader(props) {
    const { openModal, setOpenModal, setImage } = props;
    const [upImg, setUpImg] = useState(null);
    const [imgRef, setImgRef] = useState(null);
    const [crop, setCrop] = useState({ unit: '%', width: '100%', aspect: 9 / 9 });
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        setImage(null);
        return () => {
            setUpImg(null);
            setImgRef(null);
            setPreviewUrl(null);
            setCrop({ unit: '%', width: '100%', aspect: 9 / 9 });
        }
    }, []);

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback(img => {
        setImgRef(img);
        saveWholePicture(img);
    }, []);

    const makeClientCrop = async crop => {
        if (imgRef && crop.width && crop.height) {
            createCropPreview(imgRef, crop, 'newFile.jpeg');
            //TODO: wouldn't this image name create some issue of replacing the previous images 
        }
    };

    const createCropPreview = async (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(previewUrl);
                setImage(canvas.toDataURL("image/jpeg"))
                setPreviewUrl(window.URL.createObjectURL(blob));
            }, 'image/jpeg');
        });
    };
    const saveWholePicture = async (image) => {
        setImage(image.src)
    }
    const uploadImage = () => {
        if (!upImg)
            document.getElementById('upload-profile-image').click()
    }
    const setOpenModalNew = flag => {
        setUpImg(null);
        setImgRef(null);
        setPreviewUrl(null);
        setCrop({ unit: '%', width: '100%', aspect: 9 / 9 });
        setOpenModal(flag);
    }
    return (
        <Modal openModal={openModal} setOpenModal={setOpenModalNew}>
            <div className="main-upload-section">
                <div className={!upImg ? "image-crop-loader-outers-section height-100-percent" : "image-crop-loader-outers-section"} onClick={() => uploadImage()}>
                    {
                        !upImg && <div className="click-text">Click to upload image.</div>
                    }
                    <div>
                        <input id="upload-profile-image" type="file" accept="image/*" className="display-none" onChange={onSelectFile} />
                    </div>
                    <ReactCrop
                        src={upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={c => setCrop(c)}
                        onComplete={makeClientCrop}
                    />
                    {/* {previewUrl && <img alt="Crop preview" src={previewUrl} />} */}
                </div>
            </div>
        </Modal>
    );
}
