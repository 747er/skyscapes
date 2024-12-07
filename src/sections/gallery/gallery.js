import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import "photoswipe/style.css";
import Masonry from 'masonry-layout';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
  initializeGallery();
}

const gridSelector = '#gallery--photoswipe-gallery';

function initializeGallery() {
  const galleryElements = document.querySelectorAll(`${gridSelector} a`);

  if (galleryElements.length) {
    var grid = document.querySelector(gridSelector);
    var msnry = new Masonry( grid, {
      itemSelector: '.grid-item',
      columnWidth: 200
    });    

    const items = Array.from(galleryElements).map(link => ({
      src: link.getAttribute('href'),
      w: parseInt(link.getAttribute('data-pswp-width')),
      h: parseInt(link.getAttribute('data-pswp-height')),
    }));

    const lightbox = new PhotoSwipeLightbox({
        gallery: gridSelector,
        children: 'a',
        pswpModule: PhotoSwipe
    });

    lightbox.init();
  } else {
    console.log('No gallery elements found');
  }
}

