// src/components/ThreeDModal.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

const ThreeDModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-4">
        <button
          className="absolute top-3 right-3 w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <Canvas style={{ height: '500px' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <Box args={[2, 2, 2]} rotation={[0, Math.PI / 4, 0]}>
            <meshStandardMaterial attach="material" color="orange" />
          </Box>
        </Canvas>
      </div>
    </div>,
    document.body
  );
};

export default ThreeDModal;
