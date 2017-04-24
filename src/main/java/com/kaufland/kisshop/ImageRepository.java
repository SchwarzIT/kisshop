package com.kaufland.kisshop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Created by hkue0610 on 21.04.17.
 */
@RepositoryRestResource
public interface ImageRepository extends CrudRepository<Image, Long> {
}

