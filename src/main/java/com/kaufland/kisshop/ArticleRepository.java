package com.kaufland.kisshop;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by hkue0610 on 21.04.17.
 */
@RepositoryRestResource
public interface ArticleRepository extends CrudRepository<Article, Long> {
}
