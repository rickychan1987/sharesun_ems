import React, { useState, useRef } from 'react';
import {
  Box,
  Avatar,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';

interface PhotoUploadProps {
  currentPhoto?: string;
  onPhotoSelect: (file: File | null) => void;
  isLoading?: boolean;
  employeeName: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  currentPhoto,
  onPhotoSelect,
  isLoading = false,
  employeeName,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhoto || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      onPhotoSelect(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    onPhotoSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Employee Photo
      </Typography>
      
      <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
        <Avatar
          src={previewUrl || undefined}
          sx={{
            width: 120,
            height: 120,
            fontSize: '2rem',
            bgcolor: previewUrl ? 'transparent' : 'primary.main',
          }}
        >
          {!previewUrl && getInitials(employeeName)}
        </Avatar>
        
        {isLoading && (
          <CircularProgress
            size={40}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -2,
              marginLeft: -2,
            }}
          />
        )}
      </Box>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        ref={fileInputRef}
        style={{ display: 'none' }}
        disabled={isLoading}
      />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUpload />}
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          Upload Photo
        </Button>
        
        {(previewUrl || currentPhoto) && (
          <Button
            variant="text"
            color="error"
            startIcon={<Delete />}
            onClick={handleRemovePhoto}
            disabled={isLoading}
          >
            Remove Photo
          </Button>
        )}
      </Box>
      
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Supports JPG, PNG, GIF • Max 5MB
      </Typography>
    </Paper>
  );
};

export default PhotoUpload;