'use client';

import * as React from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useEdgeStore } from '../lib/edgestore';

export default function Page() {
    const [file, setFile] = React.useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = React.useState<number | null>(null);
    const [uploadStatus, setUploadStatus] = React.useState<string | null>(null);
    const [dragging, setDragging] = React.useState(false);
    const [showGenerateButton, setShowGenerateButton] = React.useState(false);
    const { edgestore } = useEdgeStore();

    const handleFileUpload = async () => {
        if (file) {
            try {
                setUploadStatus('Uploading...');
                const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                        setUploadProgress(progress);
                    },
                });
                setUploadStatus('Upload successful!');
                setShowGenerateButton(true);
                console.log(res);
            } catch (error) {
                console.error('Upload failed:', error);
                setUploadStatus('Upload failed. Please try again.');
            }
        }
    };

    const handleGenerate = () => {
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            if (uploadedFile.type === 'application/pdf') {
                setFile(uploadedFile);
                setUploadProgress(null);
                setUploadStatus(null);
                setShowGenerateButton(false);
            } else {
                alert('Only PDF files are allowed!');
                e.target.value = '';
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const uploadedFile = e.dataTransfer.files[0];
        if (uploadedFile) {
            if (uploadedFile.type === 'application/pdf') {
                setFile(uploadedFile);
                setUploadProgress(null);
                setUploadStatus(null);
                setShowGenerateButton(false);
            } else {
                alert('Only PDF files are allowed!');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#212121] px-4 sm:px-8">
            <div
                className={`w-full sm:w-96 h-56 bg-[#212121] rounded-lg border-2 ${dragging ? 'border-[#424242]' : 'border-dashed border-[#616161]'
                    } flex flex-col items-center justify-center text-[#e0e0e0] transition-all`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="file-input"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="application/pdf"
                />
                <label
                    htmlFor="file-input"
                    className="cursor-pointer text-center flex flex-col items-center"
                >
                    <MdOutlineFileUpload className="text-4xl text-[#757575] mb-2" />
                    <div className="text-lg font-medium">
                        {file ? file.name : 'Choose files'}
                    </div>
                    {!file && <div className="text-sm text-[#9e9e9e]">or drag and drop files</div>}
                </label>
            </div>

            {file && (
                <div className="mt-4 text-[#e0e0e0] flex flex-col items-center">
                    <p>
                        File selected: <span className="font-medium">{file.name}</span>
                    </p>
                    {!showGenerateButton && (
                        <button
                            onClick={handleFileUpload}
                            className="mt-4 bg-[#424242] hover:bg-[#616161] text-[#e0e0e0] font-semibold py-2 px-4 rounded-lg w-full sm:w-auto"
                        >
                            Upload
                        </button>
                    )}
                </div>
            )}

            {uploadProgress !== null && (
                <div className="mt-4 w-full sm:w-96 bg-[#424242] rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-[#757575] h-full"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                </div>
            )}

            {uploadStatus && (
                <p
                    className={`mt-4 text-sm ${uploadStatus.includes('successful') ? 'text-[#81c784]' : 'text-[#e57373]'
                        }`}
                >
                    {uploadStatus}
                </p>
            )}

            {showGenerateButton && (
                <button
                    onClick={handleGenerate}
                    className="mt-4 bg-[#424242] hover:bg-[#616161] text-[#e0e0e0] font-semibold py-2 px-4 rounded-lg w-full sm:w-auto"
                >
                    Generate
                </button>
            )}

            <p className="mt-6 text-sm text-[#bdbdbd] text-center">
                By uploading your files or using our service, you agree with our{' '}
                <a href="#" className="underline text-[#e0e0e0]">
                    Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline text-[#e0e0e0]">
                    Privacy Policy
                </a>.
            </p>
        </div>
    );
}
