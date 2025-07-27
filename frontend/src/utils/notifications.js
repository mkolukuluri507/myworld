import { toast } from '../hooks/use-toast';

/**
 * Utility functions for showing notifications
 */
export const showSuccess = (title, description = null) => {
  toast({
    title,
    description,
    variant: 'default',
    className: 'bg-[#38FF62] text-[#232323] border-[#38FF62]',
  });
};

export const showError = (title, description = null) => {
  toast({
    title,
    description,
    variant: 'destructive',
    className: 'bg-[#FF3838] text-white border-[#FF3838]',
  });
};

export const showWarning = (title, description = null) => {
  toast({
    title,
    description,
    className: 'bg-[#FFB838] text-[#232323] border-[#FFB838]',
  });
};

export const showInfo = (title, description = null) => {
  toast({
    title,
    description,
    className: 'bg-white text-[#232323] border-[rgba(35,35,35,0.2)]',
  });
};

// Specific notification functions for common use cases
export const notifyContactSuccess = () => {
  showSuccess(
    'Message Sent!',
    "Thank you for reaching out. I'll get back to you soon."
  );
};

export const notifyContactError = () => {
  showError(
    'Failed to Send Message',
    'Please try again or contact me directly via email.'
  );
};

export const notifyApiError = (error) => {
  showError(
    'Connection Error',
    error || 'Unable to connect to server. Please try again later.'
  );
};

export const notifyDownloadStarted = () => {
  showInfo(
    'Download Started',
    'Your file download has begun.'
  );
};

export const notifyDownloadError = () => {
  showError(
    'Download Failed',
    'Unable to download file. Please try again.'
  );
};