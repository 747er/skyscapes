import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import "photoswipe/style.css";

console.log('sanity check');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
  // DOM is already ready
  initializeGallery();
}

function initializeGallery() {
  console.log('DOM is ready');

  const galleryElements = document.querySelectorAll('#gallery--photoswipe-gallery a');

  console.log('Found elements! ', galleryElements);

  if (galleryElements.length) {
    const items = Array.from(galleryElements).map(link => ({
      src: link.getAttribute('href'),
      w: parseInt(link.getAttribute('data-pswp-width')),
      h: parseInt(link.getAttribute('data-pswp-height')),
    }));

    console.log('Gallery items: ', items);

    const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery--photoswipe-gallery',
        children: 'a',
        pswpModule: PhotoSwipe
    });

    lightbox.init();
    // gallery.init();
    console.log('Gallery initialized');
  } else {
    console.log('No gallery elements found');
  }
}