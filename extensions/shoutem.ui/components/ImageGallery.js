import React, {
  PropTypes,
} from 'react-native';

import ImagePreview from './ImagePreview';
import HorizontalPager from './HorizontalPager';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  sources: PropTypes.arrayOf(PropTypes.string),
};

function renderImagePreview({
  source,
  height,
  width,
}, key) {
  return (
    <ImagePreview
      source={source}
      width={width}
      height={height}
      key={key}
    />
  );
}

renderImagePreview.propTypes = ImagePreview.propTypes;

/**
 * Renders a collection of ImageGallery components within
 * a HorizontalPager. Each preview component is rendered
 * on a separate page.
 *
 * @returns {*}
 */
export default function ImageGallery({
  sources,
  width,
  height,
}) {
  function renderPage(src, key) {
    return renderImagePreview({
      source: {
        uri: src,
      },
      width,
      height,
    }, key);
  }

  return (
    <HorizontalPager
      width={width}
      height={height}
      dataSource={sources}
      renderPage={renderPage}
    />
  );
}

ImageGallery.propTypes = propTypes;
