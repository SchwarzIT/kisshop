package com.kaufland.kisshop;

import javax.persistence.*;

/**
 * Created by hkue0610 on 21.04.17.
 */
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long imageId;

    @Lob
    private byte[] content;

    public Image(byte[] content) {
        this.content = content;
    }

    public Image() {
    }

    public Long getImageId() {
        return imageId;
    }

    public Image setImageId(Long imageId) {
        this.imageId = imageId;
        return this;
    }

    public byte[] getContent() {
        return content;
    }

    public Image setContent(byte[] content) {
        this.content = content;
        return this;
    }
}