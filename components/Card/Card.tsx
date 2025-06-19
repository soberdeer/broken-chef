import React, { useEffect, useState } from "react";
import cx from "clsx";
import Image from "next/image";
import classes from "./Card.module.scss";

export default function Card({
  image,
  href,
  title,
  _highlightResult,
  studio,
  premium,
  className,
  imageTag,
}: {
  image?: string;
  href?: string;
  title?: string;
  studio?: boolean;
  premium?: boolean;
  imageTag?: string;
  _highlightResult?: {
    title?: {
      fullyHighlighted?: boolean;
      matchLevel?: "full" | "none";
      matchedWords?: string[];
      value?: string;
    };
  };
  className?: string;
}) {
  const fixImage = (link) => {
    if (link) {
      const replace = link
        ?.replace("https://www.filepicker.io", "")
        .replace("https://filepicker.io", "");
      return `https://d3awvtnmmsvyot.cloudfront.net${replace}/convert?fit=crop&w=700&h=467&quality=80&cache=true&rotate=exif&compress=true`;
    }
    return "";
  };
  return (
    <div className={cx(classes.card, className)}>
      <a href={href} className={classes.href}>
        <div className={classes.itemImage}>
          <div className={classes.hoverContent}>
            {!!imageTag && imageTag.length > 0 && (
              <div className={classes.imageTag}>{imageTag}</div>
            )}
            <img
              src={fixImage(image)}
              width="100%"
              height={205}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className={classes.content}>
          <h4
            className={classes.header}
            dangerouslySetInnerHTML={{
              __html: _highlightResult?.title?.value || title,
            }}
          />
          {(studio || premium) && (
            <div className={classes.tags}>
              {studio && <div className={classes.tag}>Studio pass</div>}
              {premium && <div className={classes.tag}>Premium</div>}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
