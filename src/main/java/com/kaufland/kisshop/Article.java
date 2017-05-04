package com.kaufland.kisshop;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Article {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String description;
	private BigDecimal price;
	private BigDecimal promotionPrice;

	@OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
	private Image image;

	public Article(String name, String description, BigDecimal price, BigDecimal pPromotionPrice, Image image) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.promotionPrice = pPromotionPrice;
		this.image = image;
	}


	public Article() {
	}


	public Long getId() {
		return id;
	}

	public Article setId(Long id) {
		this.id = id;
		return this;
	}

	public String getName() {
		return name;
	}

	public Article setName(String name) {
		this.name = name;
		return this;
	}

	public String getDescription() {
		return description;
	}

	public Article setDescription(String description) {
		this.description = description;
		return this;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public Article setPrice(BigDecimal price) {
		this.price = price;
		return this;
	}

	public BigDecimal getPromotionPrice() {
		return promotionPrice;
	}

	public Article setPromotionPrice(BigDecimal pPromotionPrice) {
		this.promotionPrice = pPromotionPrice;
		return this;
	}

	public Image getImage() {
		return image;
	}

	public Article setImage(Image image) {
		this.image = image;
		return this;
	}
}