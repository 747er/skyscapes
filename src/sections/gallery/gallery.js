import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import "photoswipe/style.css";
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

const GRID_SELECTOR = '#gallery--photoswipe-gallery';
const ITEM_SELECTOR = '.grid-item';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onDOMReady);
} else {
  onDOMReady();
}

function onDOMReady() {
  initializeGalleryWhenReady();
}

function initializeGalleryWhenReady() {
  const grid = document.querySelector(GRID_SELECTOR);

  if (!grid) {
    console.warn(`Cannot find grid container "${GRID_SELECTOR}".`);
    return;
  }

  let galleryElements = getGalleryElements();
  if (galleryElements.length > 0) {
    initializeGallery(grid);
  } else {
    const observer = new MutationObserver(() => {
      galleryElements = getGalleryElements();
      if (galleryElements.length > 0) {
        observer.disconnect();
        initializeGallery(grid);
      }
    });
    observer.observe(grid, { childList: true, subtree: true });
  }
}

function getGalleryElements() {
  return document.querySelectorAll(`${GRID_SELECTOR} ${ITEM_SELECTOR}`);
}

function initializeGallery(grid) {
  imagesLoaded(grid, () => {
    const msnry = new Masonry(grid, {
      itemSelector: ITEM_SELECTOR,
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
    msnry.layout();

    const lightbox = new PhotoSwipeLightbox({
      gallery: GRID_SELECTOR,
      children: ITEM_SELECTOR,
      pswpModule: PhotoSwipe
    });
    lightbox.init();

    console.log('Gallery and lightbox initialized.');
  });
}
