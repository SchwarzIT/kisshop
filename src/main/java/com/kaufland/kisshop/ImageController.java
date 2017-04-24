package com.kaufland.kisshop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.notFound;

@RestController
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ArticleRepository articleRepository;


    @RequestMapping(method = RequestMethod.GET, path = "/images/{imageId}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable Long imageId) {
        Image img = imageRepository.findOne(imageId);
        return buildResponse(img, MediaType.IMAGE_PNG);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/images/{imageId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Image> getImageAsJson(@PathVariable Long imageId) {
        Image img = imageRepository.findOne(imageId);
        return buildResponse(img, MediaType.APPLICATION_JSON_UTF8);
    }


    private ResponseEntity buildResponse(Image image, MediaType mediaType) {
        if (image == null) {
            return ResponseEntity.notFound().build();
        }

        if (mediaType.equals(MediaType.IMAGE_PNG)) {
            return ResponseEntity.ok()
                    .contentLength(image.getContent().length)
                    .contentType(mediaType)
                    .body(image.getContent());
        }

        return ResponseEntity.ok(image);


    }
}
