package com.kaufland.kisshop;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.math.BigDecimal;

@SpringBootApplication
public class KisshopApplication {

	/*
	 * Only for angular development
	 */
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true); // you USUALLY want this
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("DELETE");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

	public static void main(String[] args) {
		SpringApplication.run(KisshopApplication.class, args);
	}
}

@Component
class ApplicationRunner implements CommandLineRunner {

	@Autowired
	ArticleRepository articleRepository;

	@Autowired
	ApplicationContext ctx;

	@Override
	public void run(String... args) throws Exception {
		articleRepository.save(createArticle("Tafelapfel Pink Lady", "zwischen 130 - 230 g", 0.46, null, "apfel.png"));
		articleRepository.save(createArticle("K-Bio Bananen", "Pro Stück mindestens 160 g", 0.29, 0.25, "bananen.png"));
		articleRepository.save(createArticle("K-Bio Erdbeeren", "Pro Stück mindestens 30g", 0.09, null, "erdbeeren.png"));
		articleRepository.save(createArticle("Spreewälder Gurken", "520g Becher", 1.99, 1.49, "essiggurken.png"));
		articleRepository.save(createArticle("Kiwi", "Enthält viel Vitamin C", 0.45, null, "kiwi.png"));
		articleRepository.save(createArticle("Orangen", "Süß und saftig im Geschmack", 2.15, null, "orangen.png"));
		articleRepository.save(createArticle("Pfirsich", "Sehr gesund", 0.39, null, "pfirsich.png"));
		articleRepository.save(createArticle("Rispentomaten", "Feines Aroma", 2.09, 1.99, "tomaten.png"));
	}

	private Article createArticle(String pName, String pDescription, double pPrice, Double pPromotionPrice, String pImageName) throws Exception {
		Article article = new Article();

		Resource template = ctx.getResource("classpath:data/" + pImageName);
		byte[] image = IOUtils.toByteArray(template.getInputStream());

		article.setName(pName);
		article.setDescription(pDescription);
		article.setPrice(new BigDecimal(pPrice));
		if (pPromotionPrice != null) {
			article.setPromotionPrice(new BigDecimal(pPromotionPrice));
		}
		article.setImage(new Image(image));

		return article;
	}
}
