import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import "photoswipe/style.css";

if (document.readyState === 'loading') {
    console.log('loading');
  document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
  // DOM is already ready
  console.log('already ready');
  initializeGallery();
}

function initializeGallery() {
  const galleryElements = document.querySelectorAll('#gallery--photoswipe-gallery a');

  if (galleryElements.length) {
    const items = Array.from(galleryElements).map(link => ({
      src: link.getAttribute('href'),
      w: parseInt(link.getAttribute('data-pswp-width')),
      h: parseInt(link.getAttribute('data-pswp-height')),
    }));

    const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery--photoswipe-gallery',
        children: 'a',
        pswpModule: PhotoSwipe
    });

    lightbox.init();
  } else {
    console.log('No gallery elements found');
  }
}