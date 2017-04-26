package com.kaufland.kisshop;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	/**
	 * Wird für Angular benötigt, damit dort das Routing funktioniert
	 */
	@RequestMapping({"/", "/admin**", "/warenkorb", "/order"})
	public String index() {
		return "forward:/index.html";
	}

}
