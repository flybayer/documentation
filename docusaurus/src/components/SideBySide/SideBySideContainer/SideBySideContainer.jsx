import React, { useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './side-by-side-container.module.scss';

const stylesElementIdBase = 'styles-side-by-side-container';

export function SideBySideContainer({ className, spaced = true, ...rest }) {
  const stylesElementId = `${stylesElementIdBase}-${Math.random()}`;
  const [
    isAnotherSBSContainerAlreadyStyling,
    setIsAnotherSBSContainerAlreadyStyling,
  ] = useState(false);

  /**
   * Check if there is a styles container already applying the overrides for page-content width styles
   */
  useLayoutEffect(() => {
    const sbsStylesElement = document.querySelector(`[data-common-id=${stylesElementIdBase}]`);

    setIsAnotherSBSContainerAlreadyStyling(sbsStylesElement.getAttribute('id') !== stylesElementId);
  }, [stylesElementId]);

  return (
    <>
      {/* Styles to increase the page-content width */}
      {!isAnotherSBSContainerAlreadyStyling && (
        <style
          id={stylesElementId}
          data-common-id={stylesElementIdBase}
          dangerouslySetInnerHTML={{
            __html: `
              @media (min-width: 997px) {
                /** Increase the general container size */
                main article:first-child:not(.col),
                main article:first-child:not(.col) + nav {
                  --custom-main-width: 120rem;
                }

                /** Hide the right-side nav (table of contents) */
                .container > .row > .col.col--3 {
                  display: none;
                }

                /** Increase the content-column size */
                .container > .row > .col:first-child {
                  max-width: 100% !important;
                }
              }
            `
          }}
        />
      )}

      <div
        className={clsx(
          styles['sbs-container'],
          spaced && styles['sbs-container--spaced'],
          className,
        )}
        {...rest}
      />
    </>
  );
}
