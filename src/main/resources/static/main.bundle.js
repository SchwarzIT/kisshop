webpackJsonp([1,4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Information; });
var Information = (function () {
    function Information(imageName, headline, text) {
        this.imageName = imageName;
        this.headline = headline;
        this.text = text;
    }
    return Information;
}());

//# sourceMappingURL=Information.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminComponent = (function () {
    function AdminComponent() {
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin',
        template: __webpack_require__(251),
        styles: [__webpack_require__(230)]
    }),
    __metadata("design:paramtypes", [])
], AdminComponent);

//# sourceMappingURL=admin.component.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_article_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entities_Article__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__entities_Image__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_image_service__ = __webpack_require__(63);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FormComponent = (function () {
    function FormComponent(fb, router, route, articleService, imageService) {
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.articleService = articleService;
        this.imageService = imageService;
        this.image = new __WEBPACK_IMPORTED_MODULE_5__entities_Image__["a" /* Image */]();
        this.detailLink = "";
    }
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleForm = this.fb.group({
            'name': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(25)]),
            'description': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required),
            'price': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required),
            'promotionPrice': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */](''),
            'image': new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]('')
        });
        this.route.params.subscribe(function (params) {
            _this.detailLink = params.detailLink;
            // Wenn ein Artikel bearbeitet werden soll, diesen laden
            if (_this.detailLink != null) {
                _this.articleService.loadArticle(_this.detailLink).subscribe(function (article) {
                    _this.articleForm.setValue({
                        "name": article.name,
                        "description": article.description,
                        "price": article.price,
                        "promotionPrice": article.promotionPrice,
                        "image": ""
                    });
                }, function (error) {
                    console.log(error);
                });
            }
        }, function (error) {
            console.error(error);
        });
    };
    FormComponent.prototype.convertImageToBase64 = function (event) {
        var files = event.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    };
    FormComponent.prototype.cancelEdit = function () {
        this.router.navigate(['admin']);
    };
    FormComponent.prototype.saveArticle = function () {
        var article = this.mapFormGroupToInternalModel();
        if (article.detailLink) {
            if (this.image.content) {
                this.updateImageAndArticle(article);
            }
            else {
                this.updateArticle(article);
            }
        }
        else {
            this.createNewImageAndArticle(article);
        }
    };
    FormComponent.prototype.updateImageAndArticle = function (article) {
        var _this = this;
        this.imageService.createImage(article.image)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) {
            article.image = response._links.self.href;
            _this.updateArticle(article);
        }, function (error) {
            console.error("Creating Image failed");
            console.error(error);
        });
    };
    FormComponent.prototype.createNewImageAndArticle = function (article) {
        var _this = this;
        this.imageService.createImage(article.image)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) {
            article.image = response._links.self.href;
            _this.createArticle(article);
        }, function (error) {
            console.error("Creating Image failed");
            console.error(error);
        });
    };
    FormComponent.prototype.mapFormGroupToInternalModel = function () {
        var article = new __WEBPACK_IMPORTED_MODULE_4__entities_Article__["a" /* Article */]();
        article.name = this.articleForm.get('name').value;
        article.description = this.articleForm.get('description').value;
        article.price = this.articleForm.get('price').value;
        article.promotionPrice = this.articleForm.get('promotionPrice').value;
        article.image = this.image.content;
        article.detailLink = this.detailLink;
        return article;
    };
    FormComponent.prototype.handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        this.image.content = btoa(binaryString);
    };
    FormComponent.prototype.createArticle = function (article) {
        var _this = this;
        this.articleService.createArticle(article).subscribe(function (resp) {
            _this.router.navigate(["admin/"]);
        }, function (err) {
            console.error("Creation of article failed");
            console.error(err);
        });
    };
    FormComponent.prototype.updateArticle = function (pArticle) {
        var _this = this;
        this.articleService.updateArticle(pArticle).subscribe(function (resp) {
            _this.router.navigate(["admin/"]);
        }, function (err) {
            console.error("Update of article failed");
            console.error(err);
        });
    };
    return FormComponent;
}());
FormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-form',
        template: __webpack_require__(252),
        styles: [__webpack_require__(231)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_article_service__["a" /* ArticleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_article_service__["a" /* ArticleService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services_image_service__["a" /* ImageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_image_service__["a" /* ImageService */]) === "function" && _e || Object])
], FormComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=form.component.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_cart_service__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartModalComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CartModalComponent = (function (_super) {
    __extends(CartModalComponent, _super);
    function CartModalComponent(dialogService, cartService) {
        var _this = _super.call(this, dialogService) || this;
        _this.cartService = cartService;
        _this.title = "";
        _this.message = "";
        _this.articles = [];
        return _this;
    }
    CartModalComponent.prototype.confirm = function () {
        this.result = true;
        this.close();
    };
    CartModalComponent.prototype.increaseArticleNumber = function (pArticle) {
        this.cartService.addExistingArticle(pArticle);
    };
    CartModalComponent.prototype.decreaseArticleNumber = function (pArticle) {
        this.cartService.removeExistingArticle(pArticle);
    };
    return CartModalComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
CartModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-cart-modal',
        template: __webpack_require__(254),
        styles: [__webpack_require__(233)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_cart_service__["a" /* CartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_cart_service__["a" /* CartService */]) === "function" && _b || Object])
], CartModalComponent);

var _a, _b;
//# sourceMappingURL=cart-modal.component.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_Information__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_article_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_cart_service__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(articleService, cartService) {
        this.articleService = articleService;
        this.cartService = cartService;
        this.i1 = new __WEBPACK_IMPORTED_MODULE_1__entities_Information__["a" /* Information */]("information1.png", "Bio – Von umweltbewusst bis gesund", "Bio-Produkte schmecken gut und schützen das Immunsystem. Die biologische Erzeugung steht im Einklang zur Natur und wird durch die Öko-Bauern verantwortungsvoll gelebt. Lernen Sie jetzt die Bio-Welt bei Kaufland kennen.");
        this.i2 = new __WEBPACK_IMPORTED_MODULE_1__entities_Information__["a" /* Information */]("information2.png", "Aus der Region für Sie ausgewählt.", "Setzen Sie mit Ihrem Einkauf auf Produkte, die aus Ihrer näheren Umgebung stammen. Damit unterstützen Sie regionale Erzeuger und Lieferanten vor Ort und erhalten Frische und Qualität aus nächster Nähe. Ob Banane, Apfel oder Kiwi: jetzt zugreifen!");
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.loadAllArticles().subscribe(function (articles) {
            _this.articles = articles;
        }, function (error) {
            console.error(error);
        });
    };
    HomeComponent.prototype.addArticleToCart = function (article) {
        this.cartService.addArticle(article);
    };
    HomeComponent.prototype.removeArticleFromCart = function (article) {
        this.cartService.removeArticle(article);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(257)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_article_service__["a" /* ArticleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_article_service__["a" /* ArticleService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_cart_service__["a" /* CartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_cart_service__["a" /* CartService */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderConfirmationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrderConfirmationComponent = (function () {
    function OrderConfirmationComponent() {
        this.deliveryDate = new Date();
    }
    OrderConfirmationComponent.prototype.ngOnInit = function () {
        this.deliveryDate.setDate(this.deliveryDate.getDate() + 2);
    };
    return OrderConfirmationComponent;
}());
OrderConfirmationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-order-confirmation',
        template: __webpack_require__(259),
        styles: [__webpack_require__(237)]
    }),
    __metadata("design:paramtypes", [])
], OrderConfirmationComponent);

//# sourceMappingURL=order-confirmation.component.js.map

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 161;


/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(62);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(249)
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routes__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_site_articleList_articleList_component__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_article_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_order_pipe__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_order_pipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_order_pipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_image_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_site_header_header_component__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_site_footer_footer_component__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_cart_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_site_information_information_component__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_site_home_component__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng2_filter_pipe__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng2_filter_pipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_ng2_filter_pipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_admin_admin_component__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_admin_admin_list_admin_list_component__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_admin_form_form_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_router__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_bootstrap_modal__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_site_cart_modal_cart_modal_component__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_site_order_confirmation_order_confirmation_component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ngx_cookie__ = __webpack_require__(245);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__pages_site_articleList_articleList_component__["a" /* ArticleListComponent */],
            __WEBPACK_IMPORTED_MODULE_10__pages_site_header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_11__pages_site_footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_13__pages_site_information_information_component__["a" /* InformationComponent */],
            __WEBPACK_IMPORTED_MODULE_14__pages_site_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_16__pages_admin_admin_component__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_17__pages_admin_admin_list_admin_list_component__["a" /* AdminListComponent */],
            __WEBPACK_IMPORTED_MODULE_18__pages_admin_form_form_component__["a" /* FormComponent */],
            __WEBPACK_IMPORTED_MODULE_21__pages_site_cart_modal_cart_modal_component__["a" /* CartModalComponent */],
            __WEBPACK_IMPORTED_MODULE_22__pages_site_order_confirmation_order_confirmation_component__["a" /* OrderConfirmationComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_19__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_routes__["a" /* ROUTE_CONFIG */]),
            __WEBPACK_IMPORTED_MODULE_8_ng2_order_pipe__["Ng2OrderModule"],
            __WEBPACK_IMPORTED_MODULE_15_ng2_filter_pipe__["Ng2FilterPipeModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_20_ng2_bootstrap_modal__["BootstrapModalModule"],
            __WEBPACK_IMPORTED_MODULE_23_ngx_cookie__["a" /* CookieModule */].forRoot()
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__services_article_service__["a" /* ArticleService */],
            __WEBPACK_IMPORTED_MODULE_9__services_image_service__["a" /* ImageService */],
            __WEBPACK_IMPORTED_MODULE_12__services_cart_service__["a" /* CartService */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["LOCALE_ID"], useValue: "de-DE" }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_21__pages_site_cart_modal_cart_modal_component__["a" /* CartModalComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_site_home_component__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_admin_admin_component__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_admin_form_form_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_site_order_confirmation_order_confirmation_component__ = __webpack_require__(105);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROUTE_CONFIG; });




var ROUTE_CONFIG = [
    {
        path: '',
        pathMatch: 'full',
        component: __WEBPACK_IMPORTED_MODULE_0__pages_site_home_component__["a" /* HomeComponent */]
        // component: KArticleListComponent
    },
    {
        path: 'admin',
        component: __WEBPACK_IMPORTED_MODULE_1__pages_admin_admin_component__["a" /* AdminComponent */]
    },
    {
        path: 'admin/edit',
        component: __WEBPACK_IMPORTED_MODULE_2__pages_admin_form_form_component__["a" /* FormComponent */]
        // component: KArticleFormComponent
    },
    {
        path: 'admin/edit/:detailLink',
        component: __WEBPACK_IMPORTED_MODULE_2__pages_admin_form_form_component__["a" /* FormComponent */]
        // component: KArticleFormComponent
    },
    {
        path: 'order',
        component: __WEBPACK_IMPORTED_MODULE_3__pages_site_order_confirmation_order_confirmation_component__["a" /* OrderConfirmationComponent */]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleJson; });
var ArticleJson = (function () {
    function ArticleJson() {
    }
    return ArticleJson;
}());

//# sourceMappingURL=ArticleJson.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_article_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminListComponent = (function () {
    function AdminListComponent(articleService, router) {
        this.articleService = articleService;
        this.router = router;
        this.articles = [];
    }
    AdminListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.articleService.loadAllArticles().subscribe(function (articles) {
            _this.articles = articles;
        }, function (error) {
            console.error(error);
        });
    };
    AdminListComponent.prototype.addNewArticle = function () {
        this.router.navigate(["admin/edit/"]);
    };
    AdminListComponent.prototype.editArticle = function (pArticle) {
        this.router.navigate(["admin/edit/", pArticle.detailLink]);
    };
    AdminListComponent.prototype.removeArticle = function (pArticle) {
        if (confirm("Diesen Artikel löschen?")) {
            this.articleService.removeArticle(pArticle).subscribe(function (response) {
                window.location.reload();
            }, function (error) {
                console.error(error);
            });
        }
    };
    return AdminListComponent;
}());
AdminListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin-list',
        template: __webpack_require__(250),
        styles: [__webpack_require__(229)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_article_service__["a" /* ArticleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_article_service__["a" /* ArticleService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AdminListComponent);

var _a, _b;
//# sourceMappingURL=admin-list.component.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_cart_service__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ArticleListComponent = (function () {
    function ArticleListComponent(cartService) {
        this.cartService = cartService;
        this.articles = [];
        this.maxArticles = 0;
        this.headline = "Artikelliste";
    }
    ArticleListComponent.prototype.addArticleToCart = function (article) {
        this.cartService.addArticle(article);
    };
    ArticleListComponent.prototype.removeArticleFromCart = function (article) {
        this.cartService.removeArticle(article);
    };
    ArticleListComponent.prototype.increaseArticleNumber = function (pArticle) {
        this.cartService.addExistingArticle(pArticle);
    };
    ArticleListComponent.prototype.decreaseArticleNumber = function (pArticle) {
        this.cartService.removeExistingArticle(pArticle);
    };
    return ArticleListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("articles"),
    __metadata("design:type", Array)
], ArticleListComponent.prototype, "articles", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("maxArticles"),
    __metadata("design:type", Number)
], ArticleListComponent.prototype, "maxArticles", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("headline"),
    __metadata("design:type", String)
], ArticleListComponent.prototype, "headline", void 0);
ArticleListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "app-articleList",
        template: __webpack_require__(253),
        styles: [__webpack_require__(232)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_cart_service__["a" /* CartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_cart_service__["a" /* CartService */]) === "function" && _a || Object])
], ArticleListComponent);

var _a;
//# sourceMappingURL=articleList.component.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-footer',
        template: __webpack_require__(255),
        styles: [__webpack_require__(234)]
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_cart_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_modal_cart_modal_component__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HeaderComponent = (function () {
    function HeaderComponent(pCartService, dialogService, router) {
        this.dialogService = dialogService;
        this.router = router;
        this.showCart = true;
        this.showNavigation = true;
        this.headerImage = "/assets/img/headerImage.jpg";
        this.cartService = pCartService;
    }
    HeaderComponent.prototype.showCartModal = function () {
        var _this = this;
        this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__cart_modal_cart_modal_component__["a" /* CartModalComponent */], {
            title: 'Warenkorb',
            message: this.cartService.cart.length <= 0 ? 'Ihr Warenkorb ist leer' : '',
            articles: this.cartService.cart
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.cartService.clearCart();
                _this.router.navigate(['/order']);
            }
        });
    };
    return HeaderComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("showCart"),
    __metadata("design:type", Boolean)
], HeaderComponent.prototype, "showCart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("showNavigation"),
    __metadata("design:type", Boolean)
], HeaderComponent.prototype, "showNavigation", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("headerImage"),
    __metadata("design:type", String)
], HeaderComponent.prototype, "headerImage", void 0);
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__(256),
        styles: [__webpack_require__(235)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_cart_service__["a" /* CartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_cart_service__["a" /* CartService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _c || Object])
], HeaderComponent);

var _a, _b, _c;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_Information__ = __webpack_require__(100);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InformationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InformationComponent = (function () {
    function InformationComponent() {
        this.imageLeft = true;
    }
    InformationComponent.prototype.ngOnInit = function () {
    };
    return InformationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('information'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__entities_Information__["a" /* Information */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__entities_Information__["a" /* Information */]) === "function" && _a || Object)
], InformationComponent.prototype, "info", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("imageLeft"),
    __metadata("design:type", Boolean)
], InformationComponent.prototype, "imageLeft", void 0);
InformationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-information',
        template: __webpack_require__(258),
        styles: [__webpack_require__(236)]
    }),
    __metadata("design:paramtypes", [])
], InformationComponent);

var _a;
//# sourceMappingURL=information.component.js.map

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n/* Schriften */\n@font-face {\n  fonf-family: 'Kaufland';\n  src: url(\"/assets/fonts/Kaufland-Regular.svg\") format(\"svg\"); }\n\n@font-face {\n  fonf-family: 'Kaufland-Light';\n  src: url(\"/assets/fonts/Kaufland-Light.svg\") format(\"svg\"); }\n\n/* Farben */\nbutton, input, optgroup, select, textarea {\n  font-family: 'Kaufland-Light'; }\n\nhtml, body {\n  font-family: 'Kaufland-Light';\n  font-size: 16px;\n  line-height: 26px;\n  height: 100%; }\n\n.container {\n  width: 1400px; }\n\ntable {\n  font-size: 18px !important;\n  line-height: 2.5; }\n\n/* Headlines */\nh1 {\n  font-size: 32px;\n  font-weight: bold;\n  text-align: center;\n  color: #424242; }\n\nh2 {\n  font-size: 24px;\n  font-weight: bold; }\n\n.headline {\n  font-size: 50px; }\n\n.subHeadline {\n  font-size: 25px;\n  font-weight: bold; }\n\ntable {\n  font-size: 14px; }\n\n.icon {\n  height: 24px; }\n\n.iconMiddle {\n  height: 50px; }\n\n/* Formulare */\nlabel {\n  font-size: 12px;\n  color: #424242; }\n\n.form-text {\n  font-size: 14px;\n  color: #8E8E8E; }\n\n.form-control {\n  height: 36px;\n  border: 1px solid #D6D6D6;\n  border-radius: 0px;\n  font-size: 16px;\n  color: #424242; }\n\n.form-control:focus {\n  border: 1px solid #8E8E8E; }\n\n.has-error .form-text {\n  color: #F44336; }\n\n.has-error .form-control {\n  border: 1px solid #F44336;\n  background: #FDE7E6; }\n\n.has-warning .form-text {\n  color: #FFCA28; }\n\n.has-warning .form-control {\n  border: 1px solid #FFCA28;\n  background: #f9fde6; }\n\n.has-success .form-text {\n  color: #4AB54F; }\n\n.has-success .form-control {\n  border: 1px solid #4AB54F;\n  background: #e8f6e8; }\n\n.form-control:disabled {\n  background: #EFEFEF; }\n\n.errorMessage {\n  margin-top: 10px; }\n\n/* Buttons */\n.btn {\n  border-radius: 0px; }\n\n.btn a {\n  color: inherit; }\n\n.btn a:hover {\n  text-decoration: none; }\n\n.btn-primary {\n  background: #2196F3;\n  border-color: transparent; }\n\n.btn-primary:hover {\n  background: #1c71f3;\n  border-color: transparent; }\n\n.btn-primary.disabled {\n  color: #fff; }\n\n.btn-secondary {\n  background: #424242;\n  color: #fff;\n  border-color: transparent; }\n\n.btn-secondary.disabled {\n  color: #000; }\n\n.btn-tertiary {\n  background: #D6D6D6;\n  color: #000; }\n\n.btn-tertiary:hover {\n  background: #8E8E8E;\n  color: #fff; }\n\n.btn-tertiary.disabled {\n  color: #000; }\n\n.btn-quaternary {\n  background: #424242;\n  color: #fff; }\n\n.btn-quaternary:hover {\n  background: #4AB54F;\n  color: #fff; }\n\n.btn-quaternary.disabled {\n  color: #000; }\n\n.btn-cancel {\n  background: #F44336;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-cancel:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-cancel.disabled {\n  color: #fff; }\n\n.btn-save {\n  background: #4AB54F;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-save:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-save.disabled {\n  color: #fff; }\n\n/* Dropdown */\n.dropdown-toggle {\n  background: #fff;\n  border: 1px solid #D6D6D6;\n  padding: 10px; }\n\n.dropdown-toggle:focus {\n  border: 1px solid #8E8E8E; }\n\n.dropdown-menu {\n  padding: 0px;\n  border-radius: 0px; }\n\n.dropdown-item {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #EFEFEF; }\n\n.dropdown-item:hover {\n  background: #EFEFEF; }\n\n.dropdown-item .disabled {\n  color: #EFEFEF; }\n\n/* Hoverable Images */\n.hoverable {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverable:hover {\n  transform: translateZ(0) scale(1.025);\n  -webkit-transform: translateZ(0) scale(1.025);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig:hover {\n  transform: translateZ(0) scale(1.25);\n  -webkit-transform: translateZ(0) scale(1.25);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n/* Spacer */\n.spacer10 {\n  height: 10px; }\n\n.spacer40 {\n  height: 40px; }\n\n.spacer50 {\n  height: 50px; }\n\n.spacer80 {\n  height: 80px; }\n\n.spacer100 {\n  height: 100px; }\n\n/* Bootstrap Card */\n.card {\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.10%;\n  text-align: center;\n  margin-bottom: 20px; }\n\n.card:hover {\n  box-shadow: 0px 0px 10px 0px rgba(176, 176, 176, 0.5); }\n\n.card-block {\n  padding: 0.25rem; }\n\n.card-image {\n  height: 200px;\n  overflow: hidden;\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: 0 auto; }\n\n.card-image img {\n  max-height: 200px;\n  width: auto;\n  max-width: 100%; }\n\n.card-cart {\n  margin: auto; }\n\n.card-image-parent {\n  position: relative;\n  height: 200px; }\n\n.card-image-cart {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.75);\n  height: 100%;\n  width: 100%; }\n\n.card-image-cart-number {\n  font-size: 2.375rem;\n  opacity: 1;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.card-image-cart-text {\n  line-height: .875rem;\n  margin-top: .6875rem;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.outer {\n  display: table;\n  position: absolute;\n  height: 100%;\n  width: 100%; }\n\n.middle {\n  display: table-cell;\n  vertical-align: middle; }\n\n.inner {\n  margin-left: auto;\n  margin-right: auto; }\n\n.clickable {\n  cursor: pointer; }\n\n/* Modal */\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 50%; } }\n\n.price-cross {\n  text-decoration: line-through; }\n\n/* Tabellen */\nthead {\n  font-size: 12px;\n  border-bottom: 2px solid #424242;\n  line-height: 1; }\n\ntbody tr:hover {\n  background: #EFEFEF; }\n\nthead td {\n  padding-top: 24px;\n  padding-bottom: 12px; }\n\n.table td, .table th {\n  border-top: none; }\n\n.tableButton {\n  cursor: pointer;\n  font-weight: bold; }\n\n.admin-list h1 {\n  padding-top: 100px;\n  padding-bottom: 60px; }\n\n.admin-list .addButton {\n  text-align: right;\n  float: left;\n  width: 50%; }\n\n.admin-list .top {\n  margin-bottom: 50px; }\n\n.admin-list .backLinkDiv {\n  float: left;\n  width: 50%; }\n\n.admin-list .backLink {\n  color: #424242; }\n\n.admin-list .backLink:hover {\n  text-decoration: none; }\n\n.admin-list tbody td {\n  border-bottom: 1px solid #EDEDED;\n  font-size: 14px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, ".app-form h1 {\n  text-align: left;\n  padding-top: 100px; }\n\n.app-form .row {\n  padding-top: 25px; }\n\n.app-form .errorMessage {\n  padding-left: 0px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n/* Schriften */\n@font-face {\n  fonf-family: 'Kaufland';\n  src: url(\"/assets/fonts/Kaufland-Regular.svg\") format(\"svg\"); }\n\n@font-face {\n  fonf-family: 'Kaufland-Light';\n  src: url(\"/assets/fonts/Kaufland-Light.svg\") format(\"svg\"); }\n\n/* Farben */\nbutton, input, optgroup, select, textarea {\n  font-family: 'Kaufland-Light'; }\n\nhtml, body {\n  font-family: 'Kaufland-Light';\n  font-size: 16px;\n  line-height: 26px;\n  height: 100%; }\n\n.container {\n  width: 1400px; }\n\ntable {\n  font-size: 18px !important;\n  line-height: 2.5; }\n\n/* Headlines */\nh1 {\n  font-size: 32px;\n  font-weight: bold;\n  text-align: center;\n  color: #424242; }\n\nh2 {\n  font-size: 24px;\n  font-weight: bold; }\n\n.headline {\n  font-size: 50px; }\n\n.subHeadline {\n  font-size: 25px;\n  font-weight: bold; }\n\ntable {\n  font-size: 14px; }\n\n.icon {\n  height: 24px; }\n\n.iconMiddle {\n  height: 50px; }\n\n/* Formulare */\nlabel {\n  font-size: 12px;\n  color: #424242; }\n\n.form-text {\n  font-size: 14px;\n  color: #8E8E8E; }\n\n.form-control {\n  height: 36px;\n  border: 1px solid #D6D6D6;\n  border-radius: 0px;\n  font-size: 16px;\n  color: #424242; }\n\n.form-control:focus {\n  border: 1px solid #8E8E8E; }\n\n.has-error .form-text {\n  color: #F44336; }\n\n.has-error .form-control {\n  border: 1px solid #F44336;\n  background: #FDE7E6; }\n\n.has-warning .form-text {\n  color: #FFCA28; }\n\n.has-warning .form-control {\n  border: 1px solid #FFCA28;\n  background: #f9fde6; }\n\n.has-success .form-text {\n  color: #4AB54F; }\n\n.has-success .form-control {\n  border: 1px solid #4AB54F;\n  background: #e8f6e8; }\n\n.form-control:disabled {\n  background: #EFEFEF; }\n\n.errorMessage {\n  margin-top: 10px; }\n\n/* Buttons */\n.btn {\n  border-radius: 0px; }\n\n.btn a {\n  color: inherit; }\n\n.btn a:hover {\n  text-decoration: none; }\n\n.btn-primary {\n  background: #2196F3;\n  border-color: transparent; }\n\n.btn-primary:hover {\n  background: #1c71f3;\n  border-color: transparent; }\n\n.btn-primary.disabled {\n  color: #fff; }\n\n.btn-secondary {\n  background: #424242;\n  color: #fff;\n  border-color: transparent; }\n\n.btn-secondary.disabled {\n  color: #000; }\n\n.btn-tertiary {\n  background: #D6D6D6;\n  color: #000; }\n\n.btn-tertiary:hover {\n  background: #8E8E8E;\n  color: #fff; }\n\n.btn-tertiary.disabled {\n  color: #000; }\n\n.btn-quaternary {\n  background: #424242;\n  color: #fff; }\n\n.btn-quaternary:hover {\n  background: #4AB54F;\n  color: #fff; }\n\n.btn-quaternary.disabled {\n  color: #000; }\n\n.btn-cancel {\n  background: #F44336;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-cancel:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-cancel.disabled {\n  color: #fff; }\n\n.btn-save {\n  background: #4AB54F;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-save:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-save.disabled {\n  color: #fff; }\n\n/* Dropdown */\n.dropdown-toggle {\n  background: #fff;\n  border: 1px solid #D6D6D6;\n  padding: 10px; }\n\n.dropdown-toggle:focus {\n  border: 1px solid #8E8E8E; }\n\n.dropdown-menu {\n  padding: 0px;\n  border-radius: 0px; }\n\n.dropdown-item {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #EFEFEF; }\n\n.dropdown-item:hover {\n  background: #EFEFEF; }\n\n.dropdown-item .disabled {\n  color: #EFEFEF; }\n\n/* Hoverable Images */\n.hoverable {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverable:hover {\n  transform: translateZ(0) scale(1.025);\n  -webkit-transform: translateZ(0) scale(1.025);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig:hover {\n  transform: translateZ(0) scale(1.25);\n  -webkit-transform: translateZ(0) scale(1.25);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n/* Spacer */\n.spacer10 {\n  height: 10px; }\n\n.spacer40 {\n  height: 40px; }\n\n.spacer50 {\n  height: 50px; }\n\n.spacer80 {\n  height: 80px; }\n\n.spacer100 {\n  height: 100px; }\n\n/* Bootstrap Card */\n.card {\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.10%;\n  text-align: center;\n  margin-bottom: 20px; }\n\n.card:hover {\n  box-shadow: 0px 0px 10px 0px rgba(176, 176, 176, 0.5); }\n\n.card-block {\n  padding: 0.25rem; }\n\n.card-image {\n  height: 200px;\n  overflow: hidden;\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: 0 auto; }\n\n.card-image img {\n  max-height: 200px;\n  width: auto;\n  max-width: 100%; }\n\n.card-cart {\n  margin: auto; }\n\n.card-image-parent {\n  position: relative;\n  height: 200px; }\n\n.card-image-cart {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.75);\n  height: 100%;\n  width: 100%; }\n\n.card-image-cart-number {\n  font-size: 2.375rem;\n  opacity: 1;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.card-image-cart-text {\n  line-height: .875rem;\n  margin-top: .6875rem;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.outer {\n  display: table;\n  position: absolute;\n  height: 100%;\n  width: 100%; }\n\n.middle {\n  display: table-cell;\n  vertical-align: middle; }\n\n.inner {\n  margin-left: auto;\n  margin-right: auto; }\n\n.clickable {\n  cursor: pointer; }\n\n/* Modal */\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 50%; } }\n\n.price-cross {\n  text-decoration: line-through; }\n\n/* Tabellen */\nthead {\n  font-size: 12px;\n  border-bottom: 2px solid #424242;\n  line-height: 1; }\n\ntbody tr:hover {\n  background: #EFEFEF; }\n\nthead td {\n  padding-top: 24px;\n  padding-bottom: 12px; }\n\n.table td, .table th {\n  border-top: none; }\n\n.tableButton {\n  cursor: pointer;\n  font-weight: bold; }\n\n.headingArticleList {\n  margin-top: 80px;\n  margin-bottom: 60px; }\n\n.card-title {\n  font-size: 18px;\n  font-weight: bold; }\n\n.card-text {\n  font-size: 18px; }\n\n.card-price {\n  font-weight: 900;\n  font-size: 22px;\n  line-height: 1em; }\n\n.isInCart {\n  border: 2px solid #4AB54F; }\n\n.card-cart-number {\n  text-align: right; }\n\n.btn-cart {\n  width: 50px;\n  height: 50px;\n  padding: 0; }\n\n.btn-cart:hover {\n  background: #4AB54F; }\n\n.card-promotionPrice {\n  font-weight: 900;\n  font-size: 26px;\n  line-height: 1em;\n  color: #F44336; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n/* Schriften */\n@font-face {\n  fonf-family: 'Kaufland';\n  src: url(\"/assets/fonts/Kaufland-Regular.svg\") format(\"svg\"); }\n\n@font-face {\n  fonf-family: 'Kaufland-Light';\n  src: url(\"/assets/fonts/Kaufland-Light.svg\") format(\"svg\"); }\n\n/* Farben */\nbutton, input, optgroup, select, textarea {\n  font-family: 'Kaufland-Light'; }\n\nhtml, body {\n  font-family: 'Kaufland-Light';\n  font-size: 16px;\n  line-height: 26px;\n  height: 100%; }\n\n.container {\n  width: 1400px; }\n\ntable {\n  font-size: 18px !important;\n  line-height: 2.5; }\n\n/* Headlines */\nh1 {\n  font-size: 32px;\n  font-weight: bold;\n  text-align: center;\n  color: #424242; }\n\nh2 {\n  font-size: 24px;\n  font-weight: bold; }\n\n.headline {\n  font-size: 50px; }\n\n.subHeadline {\n  font-size: 25px;\n  font-weight: bold; }\n\ntable {\n  font-size: 14px; }\n\n.icon {\n  height: 24px; }\n\n.iconMiddle {\n  height: 50px; }\n\n/* Formulare */\nlabel {\n  font-size: 12px;\n  color: #424242; }\n\n.form-text {\n  font-size: 14px;\n  color: #8E8E8E; }\n\n.form-control {\n  height: 36px;\n  border: 1px solid #D6D6D6;\n  border-radius: 0px;\n  font-size: 16px;\n  color: #424242; }\n\n.form-control:focus {\n  border: 1px solid #8E8E8E; }\n\n.has-error .form-text {\n  color: #F44336; }\n\n.has-error .form-control {\n  border: 1px solid #F44336;\n  background: #FDE7E6; }\n\n.has-warning .form-text {\n  color: #FFCA28; }\n\n.has-warning .form-control {\n  border: 1px solid #FFCA28;\n  background: #f9fde6; }\n\n.has-success .form-text {\n  color: #4AB54F; }\n\n.has-success .form-control {\n  border: 1px solid #4AB54F;\n  background: #e8f6e8; }\n\n.form-control:disabled {\n  background: #EFEFEF; }\n\n.errorMessage {\n  margin-top: 10px; }\n\n/* Buttons */\n.btn {\n  border-radius: 0px; }\n\n.btn a {\n  color: inherit; }\n\n.btn a:hover {\n  text-decoration: none; }\n\n.btn-primary {\n  background: #2196F3;\n  border-color: transparent; }\n\n.btn-primary:hover {\n  background: #1c71f3;\n  border-color: transparent; }\n\n.btn-primary.disabled {\n  color: #fff; }\n\n.btn-secondary {\n  background: #424242;\n  color: #fff;\n  border-color: transparent; }\n\n.btn-secondary.disabled {\n  color: #000; }\n\n.btn-tertiary {\n  background: #D6D6D6;\n  color: #000; }\n\n.btn-tertiary:hover {\n  background: #8E8E8E;\n  color: #fff; }\n\n.btn-tertiary.disabled {\n  color: #000; }\n\n.btn-quaternary {\n  background: #424242;\n  color: #fff; }\n\n.btn-quaternary:hover {\n  background: #4AB54F;\n  color: #fff; }\n\n.btn-quaternary.disabled {\n  color: #000; }\n\n.btn-cancel {\n  background: #F44336;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-cancel:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-cancel.disabled {\n  color: #fff; }\n\n.btn-save {\n  background: #4AB54F;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-save:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-save.disabled {\n  color: #fff; }\n\n/* Dropdown */\n.dropdown-toggle {\n  background: #fff;\n  border: 1px solid #D6D6D6;\n  padding: 10px; }\n\n.dropdown-toggle:focus {\n  border: 1px solid #8E8E8E; }\n\n.dropdown-menu {\n  padding: 0px;\n  border-radius: 0px; }\n\n.dropdown-item {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #EFEFEF; }\n\n.dropdown-item:hover {\n  background: #EFEFEF; }\n\n.dropdown-item .disabled {\n  color: #EFEFEF; }\n\n/* Hoverable Images */\n.hoverable {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverable:hover {\n  transform: translateZ(0) scale(1.025);\n  -webkit-transform: translateZ(0) scale(1.025);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig:hover {\n  transform: translateZ(0) scale(1.25);\n  -webkit-transform: translateZ(0) scale(1.25);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n/* Spacer */\n.spacer10 {\n  height: 10px; }\n\n.spacer40 {\n  height: 40px; }\n\n.spacer50 {\n  height: 50px; }\n\n.spacer80 {\n  height: 80px; }\n\n.spacer100 {\n  height: 100px; }\n\n/* Bootstrap Card */\n.card {\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.10%;\n  text-align: center;\n  margin-bottom: 20px; }\n\n.card:hover {\n  box-shadow: 0px 0px 10px 0px rgba(176, 176, 176, 0.5); }\n\n.card-block {\n  padding: 0.25rem; }\n\n.card-image {\n  height: 200px;\n  overflow: hidden;\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: 0 auto; }\n\n.card-image img {\n  max-height: 200px;\n  width: auto;\n  max-width: 100%; }\n\n.card-cart {\n  margin: auto; }\n\n.card-image-parent {\n  position: relative;\n  height: 200px; }\n\n.card-image-cart {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.75);\n  height: 100%;\n  width: 100%; }\n\n.card-image-cart-number {\n  font-size: 2.375rem;\n  opacity: 1;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.card-image-cart-text {\n  line-height: .875rem;\n  margin-top: .6875rem;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.outer {\n  display: table;\n  position: absolute;\n  height: 100%;\n  width: 100%; }\n\n.middle {\n  display: table-cell;\n  vertical-align: middle; }\n\n.inner {\n  margin-left: auto;\n  margin-right: auto; }\n\n.clickable {\n  cursor: pointer; }\n\n/* Modal */\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 50%; } }\n\n.price-cross {\n  text-decoration: line-through; }\n\n/* Tabellen */\nthead {\n  font-size: 12px;\n  border-bottom: 2px solid #424242;\n  line-height: 1; }\n\ntbody tr:hover {\n  background: #EFEFEF; }\n\nthead td {\n  padding-top: 24px;\n  padding-bottom: 12px; }\n\n.table td, .table th {\n  border-top: none; }\n\n.tableButton {\n  cursor: pointer;\n  font-weight: bold; }\n\n.cart-article-description-name {\n  font-weight: 700; }\n\n.cart-article-description-description {\n  font-size: 0.75em; }\n\n.cart-article-count,\n.cart-article-price,\n.cart-article-totalPrice {\n  text-align: center;\n  padding-top: 15px; }\n\n.cart-article-count {\n  font-size: 1.25em;\n  font-weight: 700; }\n\n.cart-article-totalPrice {\n  font-weight: bold; }\n\n.cart-totalPrice-label {\n  font-size: 1.3125rem;\n  font-weight: 700; }\n\n.cart-MwSt-label {\n  font-size: 13px; }\n\n.cart-totalPrice {\n  font-size: 1.3125rem;\n  text-align: center;\n  font-weight: 800;\n  color: #424242; }\n\n.modal-promotionPrice {\n  font-weight: bold;\n  color: #F44336; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n/* Schriften */\n@font-face {\n  fonf-family: 'Kaufland';\n  src: url(\"/assets/fonts/Kaufland-Regular.svg\") format(\"svg\"); }\n\n@font-face {\n  fonf-family: 'Kaufland-Light';\n  src: url(\"/assets/fonts/Kaufland-Light.svg\") format(\"svg\"); }\n\n/* Farben */\nbutton, input, optgroup, select, textarea {\n  font-family: 'Kaufland-Light'; }\n\nhtml, body {\n  font-family: 'Kaufland-Light';\n  font-size: 16px;\n  line-height: 26px;\n  height: 100%; }\n\n.container {\n  width: 1400px; }\n\ntable {\n  font-size: 18px !important;\n  line-height: 2.5; }\n\n/* Headlines */\nh1 {\n  font-size: 32px;\n  font-weight: bold;\n  text-align: center;\n  color: #424242; }\n\nh2 {\n  font-size: 24px;\n  font-weight: bold; }\n\n.headline {\n  font-size: 50px; }\n\n.subHeadline {\n  font-size: 25px;\n  font-weight: bold; }\n\ntable {\n  font-size: 14px; }\n\n.icon {\n  height: 24px; }\n\n.iconMiddle {\n  height: 50px; }\n\n/* Formulare */\nlabel {\n  font-size: 12px;\n  color: #424242; }\n\n.form-text {\n  font-size: 14px;\n  color: #8E8E8E; }\n\n.form-control {\n  height: 36px;\n  border: 1px solid #D6D6D6;\n  border-radius: 0px;\n  font-size: 16px;\n  color: #424242; }\n\n.form-control:focus {\n  border: 1px solid #8E8E8E; }\n\n.has-error .form-text {\n  color: #F44336; }\n\n.has-error .form-control {\n  border: 1px solid #F44336;\n  background: #FDE7E6; }\n\n.has-warning .form-text {\n  color: #FFCA28; }\n\n.has-warning .form-control {\n  border: 1px solid #FFCA28;\n  background: #f9fde6; }\n\n.has-success .form-text {\n  color: #4AB54F; }\n\n.has-success .form-control {\n  border: 1px solid #4AB54F;\n  background: #e8f6e8; }\n\n.form-control:disabled {\n  background: #EFEFEF; }\n\n.errorMessage {\n  margin-top: 10px; }\n\n/* Buttons */\n.btn {\n  border-radius: 0px; }\n\n.btn a {\n  color: inherit; }\n\n.btn a:hover {\n  text-decoration: none; }\n\n.btn-primary {\n  background: #2196F3;\n  border-color: transparent; }\n\n.btn-primary:hover {\n  background: #1c71f3;\n  border-color: transparent; }\n\n.btn-primary.disabled {\n  color: #fff; }\n\n.btn-secondary {\n  background: #424242;\n  color: #fff;\n  border-color: transparent; }\n\n.btn-secondary.disabled {\n  color: #000; }\n\n.btn-tertiary {\n  background: #D6D6D6;\n  color: #000; }\n\n.btn-tertiary:hover {\n  background: #8E8E8E;\n  color: #fff; }\n\n.btn-tertiary.disabled {\n  color: #000; }\n\n.btn-quaternary {\n  background: #424242;\n  color: #fff; }\n\n.btn-quaternary:hover {\n  background: #4AB54F;\n  color: #fff; }\n\n.btn-quaternary.disabled {\n  color: #000; }\n\n.btn-cancel {\n  background: #F44336;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-cancel:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-cancel.disabled {\n  color: #fff; }\n\n.btn-save {\n  background: #4AB54F;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-save:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-save.disabled {\n  color: #fff; }\n\n/* Dropdown */\n.dropdown-toggle {\n  background: #fff;\n  border: 1px solid #D6D6D6;\n  padding: 10px; }\n\n.dropdown-toggle:focus {\n  border: 1px solid #8E8E8E; }\n\n.dropdown-menu {\n  padding: 0px;\n  border-radius: 0px; }\n\n.dropdown-item {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #EFEFEF; }\n\n.dropdown-item:hover {\n  background: #EFEFEF; }\n\n.dropdown-item .disabled {\n  color: #EFEFEF; }\n\n/* Hoverable Images */\n.hoverable {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverable:hover {\n  transform: translateZ(0) scale(1.025);\n  -webkit-transform: translateZ(0) scale(1.025);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig:hover {\n  transform: translateZ(0) scale(1.25);\n  -webkit-transform: translateZ(0) scale(1.25);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n/* Spacer */\n.spacer10 {\n  height: 10px; }\n\n.spacer40 {\n  height: 40px; }\n\n.spacer50 {\n  height: 50px; }\n\n.spacer80 {\n  height: 80px; }\n\n.spacer100 {\n  height: 100px; }\n\n/* Bootstrap Card */\n.card {\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.10%;\n  text-align: center;\n  margin-bottom: 20px; }\n\n.card:hover {\n  box-shadow: 0px 0px 10px 0px rgba(176, 176, 176, 0.5); }\n\n.card-block {\n  padding: 0.25rem; }\n\n.card-image {\n  height: 200px;\n  overflow: hidden;\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: 0 auto; }\n\n.card-image img {\n  max-height: 200px;\n  width: auto;\n  max-width: 100%; }\n\n.card-cart {\n  margin: auto; }\n\n.card-image-parent {\n  position: relative;\n  height: 200px; }\n\n.card-image-cart {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.75);\n  height: 100%;\n  width: 100%; }\n\n.card-image-cart-number {\n  font-size: 2.375rem;\n  opacity: 1;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.card-image-cart-text {\n  line-height: .875rem;\n  margin-top: .6875rem;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.outer {\n  display: table;\n  position: absolute;\n  height: 100%;\n  width: 100%; }\n\n.middle {\n  display: table-cell;\n  vertical-align: middle; }\n\n.inner {\n  margin-left: auto;\n  margin-right: auto; }\n\n.clickable {\n  cursor: pointer; }\n\n/* Modal */\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 50%; } }\n\n.price-cross {\n  text-decoration: line-through; }\n\n/* Tabellen */\nthead {\n  font-size: 12px;\n  border-bottom: 2px solid #424242;\n  line-height: 1; }\n\ntbody tr:hover {\n  background: #EFEFEF; }\n\nthead td {\n  padding-top: 24px;\n  padding-bottom: 12px; }\n\n.table td, .table th {\n  border-top: none; }\n\n.tableButton {\n  cursor: pointer;\n  font-weight: bold; }\n\n.footer {\n  margin-top: 100px;\n  margin-bottom: 100px;\n  text-align: center;\n  background: #EDEDED;\n  height: 210px; }\n\n.footerRow {\n  padding-top: 60px; }\n\n.iconBig {\n  height: 75px; }\n\n.iconSubtitle {\n  color: #424242;\n  font-weight: 700;\n  font-size: 18px;\n  padding-top: 15px; }\n\n.h1 {\n  margin-top: 100px; }\n\n.footer-table {\n  width: 100%;\n  margin-top: 50px;\n  color: #8E8E8E;\n  text-align: center; }\n\n.footer-logo {\n  text-align: center;\n  margin-top: 80px;\n  margin-bottom: 50px; }\n\n.footer-logo img {\n  height: 100px;\n  width: auto; }\n\n.iconFooter {\n  height: 48px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n/* Schriften */\n@font-face {\n  fonf-family: 'Kaufland';\n  src: url(\"/assets/fonts/Kaufland-Regular.svg\") format(\"svg\"); }\n\n@font-face {\n  fonf-family: 'Kaufland-Light';\n  src: url(\"/assets/fonts/Kaufland-Light.svg\") format(\"svg\"); }\n\n/* Farben */\nbutton, input, optgroup, select, textarea {\n  font-family: 'Kaufland-Light'; }\n\nhtml, body {\n  font-family: 'Kaufland-Light';\n  font-size: 16px;\n  line-height: 26px;\n  height: 100%; }\n\n.container {\n  width: 1400px; }\n\ntable {\n  font-size: 18px !important;\n  line-height: 2.5; }\n\n/* Headlines */\nh1 {\n  font-size: 32px;\n  font-weight: bold;\n  text-align: center;\n  color: #424242; }\n\nh2 {\n  font-size: 24px;\n  font-weight: bold; }\n\n.headline {\n  font-size: 50px; }\n\n.subHeadline {\n  font-size: 25px;\n  font-weight: bold; }\n\ntable {\n  font-size: 14px; }\n\n.icon {\n  height: 24px; }\n\n.iconMiddle {\n  height: 50px; }\n\n/* Formulare */\nlabel {\n  font-size: 12px;\n  color: #424242; }\n\n.form-text {\n  font-size: 14px;\n  color: #8E8E8E; }\n\n.form-control {\n  height: 36px;\n  border: 1px solid #D6D6D6;\n  border-radius: 0px;\n  font-size: 16px;\n  color: #424242; }\n\n.form-control:focus {\n  border: 1px solid #8E8E8E; }\n\n.has-error .form-text {\n  color: #F44336; }\n\n.has-error .form-control {\n  border: 1px solid #F44336;\n  background: #FDE7E6; }\n\n.has-warning .form-text {\n  color: #FFCA28; }\n\n.has-warning .form-control {\n  border: 1px solid #FFCA28;\n  background: #f9fde6; }\n\n.has-success .form-text {\n  color: #4AB54F; }\n\n.has-success .form-control {\n  border: 1px solid #4AB54F;\n  background: #e8f6e8; }\n\n.form-control:disabled {\n  background: #EFEFEF; }\n\n.errorMessage {\n  margin-top: 10px; }\n\n/* Buttons */\n.btn {\n  border-radius: 0px; }\n\n.btn a {\n  color: inherit; }\n\n.btn a:hover {\n  text-decoration: none; }\n\n.btn-primary {\n  background: #2196F3;\n  border-color: transparent; }\n\n.btn-primary:hover {\n  background: #1c71f3;\n  border-color: transparent; }\n\n.btn-primary.disabled {\n  color: #fff; }\n\n.btn-secondary {\n  background: #424242;\n  color: #fff;\n  border-color: transparent; }\n\n.btn-secondary.disabled {\n  color: #000; }\n\n.btn-tertiary {\n  background: #D6D6D6;\n  color: #000; }\n\n.btn-tertiary:hover {\n  background: #8E8E8E;\n  color: #fff; }\n\n.btn-tertiary.disabled {\n  color: #000; }\n\n.btn-quaternary {\n  background: #424242;\n  color: #fff; }\n\n.btn-quaternary:hover {\n  background: #4AB54F;\n  color: #fff; }\n\n.btn-quaternary.disabled {\n  color: #000; }\n\n.btn-cancel {\n  background: #F44336;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-cancel:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-cancel.disabled {\n  color: #fff; }\n\n.btn-save {\n  background: #4AB54F;\n  border-color: transparent;\n  color: #fff; }\n\n.btn-save:hover {\n  background: #939393;\n  border-color: transparent; }\n\n.btn-save.disabled {\n  color: #fff; }\n\n/* Dropdown */\n.dropdown-toggle {\n  background: #fff;\n  border: 1px solid #D6D6D6;\n  padding: 10px; }\n\n.dropdown-toggle:focus {\n  border: 1px solid #8E8E8E; }\n\n.dropdown-menu {\n  padding: 0px;\n  border-radius: 0px; }\n\n.dropdown-item {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #EFEFEF; }\n\n.dropdown-item:hover {\n  background: #EFEFEF; }\n\n.dropdown-item .disabled {\n  color: #EFEFEF; }\n\n/* Hoverable Images */\n.hoverable {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverable:hover {\n  transform: translateZ(0) scale(1.025);\n  -webkit-transform: translateZ(0) scale(1.025);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig {\n  transform: translateZ(1) scale(1);\n  -webkit-transform: translateZ(1) scale(1);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n.hoverableBig:hover {\n  transform: translateZ(0) scale(1.25);\n  -webkit-transform: translateZ(0) scale(1.25);\n  transition: all .5s;\n  -webkit-backface-visibility: hidden; }\n\n/* Spacer */\n.spacer10 {\n  height: 10px; }\n\n.spacer40 {\n  height: 40px; }\n\n.spacer50 {\n  height: 50px; }\n\n.spacer80 {\n  height: 80px; }\n\n.spacer100 {\n  height: 100px; }\n\n/* Bootstrap Card */\n.card {\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.10%;\n  text-align: center;\n  margin-bottom: 20px; }\n\n.card:hover {\n  box-shadow: 0px 0px 10px 0px rgba(176, 176, 176, 0.5); }\n\n.card-block {\n  padding: 0.25rem; }\n\n.card-image {\n  height: 200px;\n  overflow: hidden;\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: 0 auto; }\n\n.card-image img {\n  max-height: 200px;\n  width: auto;\n  max-width: 100%; }\n\n.card-cart {\n  margin: auto; }\n\n.card-image-parent {\n  position: relative;\n  height: 200px; }\n\n.card-image-cart {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.75);\n  height: 100%;\n  width: 100%; }\n\n.card-image-cart-number {\n  font-size: 2.375rem;\n  opacity: 1;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.card-image-cart-text {\n  line-height: .875rem;\n  margin-top: .6875rem;\n  display: block;\n  font-weight: 700;\n  color: #424242; }\n\n.outer {\n  display: table;\n  position: absolute;\n  height: 100%;\n  width: 100%; }\n\n.middle {\n  display: table-cell;\n  vertical-align: middle; }\n\n.inner {\n  margin-left: auto;\n  margin-right: auto; }\n\n.clickable {\n  cursor: pointer; }\n\n/* Modal */\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 50%; } }\n\n.price-cross {\n  text-decoration: line-through; }\n\n/* Tabellen */\nthead {\n  font-size: 12px;\n  border-bottom: 2px solid #424242;\n  line-height: 1; }\n\ntbody tr:hover {\n  background: #EFEFEF; }\n\nthead td {\n  padding-top: 24px;\n  padding-bottom: 12px; }\n\n.table td, .table th {\n  border-top: none; }\n\n.tableButton {\n  cursor: pointer;\n  font-weight: bold; }\n\n.header-top {\n  margin-top: 20px;\n  margin-bottom: 20px; }\n\n.header-logo {\n  float: left;\n  width: 100px; }\n\n.header-logo img {\n  height: 84px;\n  width: auto; }\n\n.header-navigation,\n.header-right {\n  height: 84px;\n  position: relative;\n  font-size: 14px;\n  line-height: normal; }\n\n.header-right > .header-content {\n  right: 0; }\n\n.header-content {\n  position: absolute;\n  bottom: 0; }\n\n.header-navigation {\n  float: left;\n  width: 80%; }\n\n.header-right {\n  float: left;\n  width: calc(20% - 100px);\n  text-align: right; }\n\n.header-navigation ul {\n  list-style: none; }\n\n.header-navigation li {\n  float: left;\n  margin-right: 20px; }\n\n.header-navigation a {\n  color: #8E8E8E; }\n\n.header-image {\n  height: 500px;\n  width: 100%;\n  overflow: hidden;\n  background-size: cover; }\n\n.cart-info {\n  float: right;\n  font-size: 14px;\n  line-height: 1.0;\n  margin-left: 15px;\n  width: 60px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, ".information .headingInformation {\n  font-size: 24px; }\n\n.information .information-image {\n  height: 250px;\n  width: 50%;\n  overflow: hidden; }\n\n.information .information-image-left {\n  float: left; }\n\n.information .information-image-right {\n  float: right; }\n\n.information .information-content {\n  width: 50%;\n  padding: 50px;\n  float: left;\n  font-size: 16px;\n  font-weight: lighter; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 249:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 250:
/***/ (function(module, exports) {

module.exports = "<div class=\"container admin-list\">\n  <h1 style=\"text-align: left;\">Vorhandene Artikel</h1>\n\n  <div class=\"top\">\n    <div class=\"backLinkDiv\">\n      <a href=\"/\" class=\"backLink\">\n        Zurück zum Shop\n      </a>\n    </div>\n    <div class=\"addButton\">\n      <button class=\"btn btn-secondary\" (click)=\"addNewArticle()\">\n        Neuer Artikel anlegen\n      </button>\n    </div>\n    <div style=\"clear: both;\"></div>\n  </div>\n\n  <table class=\"table\">\n    <thead>\n    <tr>\n      <td width=\"10%\">Bild</td>\n      <td width=\"50%\">Bezeichnung</td>\n      <td width=\"10%\">Preis</td>\n      <td width=\"10%\">Aktionspreis</td>\n      <td width=\"10%\"></td>\n      <td width=\"10%\"></td>\n    </tr>\n    </thead>\n    <tbody>\n    <tr *ngFor=\"let article of articles | orderBy: 'name'\">\n      <td><img src=\"data:image/png;base64,{{ article.image }}\"\n               alt=\"{{ article.name }}\"\n               class=\"icon\"\n               onerror=\"this.src='/assets/img/noImagePlaceholder.png'\"/></td>\n      <td>{{ article.name }}</td>\n      <td>{{ article.price | currency : 'EUR' : true }}</td>\n      <td>{{ article.promotionPrice | currency : 'EUR' : true }}</td>\n      <td>\n        <div (click)=\"editArticle(article)\" class=\"tableButton\">\n          <img src=\"assets/icons/edit.svg\" class=\"icon\"/>\n          bearbeiten\n        </div>\n      </td>\n      <td>\n        <div (click)=\"removeArticle(article)\" class=\"tableButton\">\n          <img src=\"assets/icons/remove-circle.svg\" class=\"icon\"/>\n          löschen\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),

/***/ 251:
/***/ (function(module, exports) {

module.exports = "<app-admin-list></app-admin-list>\n\n<app-footer></app-footer>\n"

/***/ }),

/***/ 252:
/***/ (function(module, exports) {

module.exports = "<div class=\"container app-form\">\n  <h1 *ngIf=\"!detailLink\">Neuer Artikel anlegen</h1>\n  <h1 *ngIf=\"detailLink\">Artikel bearbeiten</h1>\n\n  <form [formGroup]=\"articleForm\" class=\"formComponent\">\n\n    <!-- Bild -->\n    <div class=\"form-group row\">\n      <label class=\"col-2\">Bild</label>\n\n      <div class=\"col-10\" style=\"padding-left: 0px; padding-right: 0px;\">\n        <img src=\"data:image/png;base64,{{ image.content }}\" style=\"height: 154px;\"\n             onerror=\"this.src='assets/img/bildPlatzhalter.png'\"/> <br/>\n        <input type=\"file\"\n               class=\"form-control\"\n               formControlName=\"image\"\n               (change)=\"convertImageToBase64($event)\">\n      </div>\n    </div>\n\n    <!-- Name -->\n    <div class=\"form-group row\"\n         [ngClass]=\"{'has-error' : articleForm.get('name').touched && articleForm.get('name').status == 'INVALID'}\">\n\n      <label class=\"col-2\">Name*</label>\n      <input type=\"text\" class=\"form-control col-10\" formControlName=\"name\">\n\n      <div class=\"col-2\"></div>\n      <small class=\"form-text col-10 errorMessage\"\n             *ngIf=\"articleForm.get('name').touched && articleForm.get('name').status == 'INVALID'\">\n        Bitte gebe einen gültigen Namen für den Artikel sein\n      </small>\n    </div>\n\n    <!-- Beschreibung -->\n    <div class=\"form-group row\"\n         [ngClass]=\"{'has-error' : articleForm.get('description').touched && articleForm.get('description').status == 'INVALID'}\">\n\n      <label class=\"col-2\">Beschreibung*</label>\n      <input type=\"text\" class=\"form-control col-10\" formControlName=\"description\">\n\n      <div class=\"col-2\"></div>\n      <small class=\"form-text col-10 errorMessage\"\n             *ngIf=\"articleForm.get('description').touched && articleForm.get('description').status == 'INVALID'\">\n        Bitte gebe eine kurze Beschreibung zum Artikel ein\n      </small>\n    </div>\n\n    <!-- Preis -->\n    <div class=\"form-group row\"\n         [ngClass]=\"{'has-error' : articleForm.get('price').touched && articleForm.get('price').status == 'INVALID'}\">\n\n      <label class=\"col-2\">Preis*</label>\n      <input type=\"number\" class=\"form-control col-10\" formControlName=\"price\" step=\"0.01\" min=\"0.01\" value=\"0.00\">\n\n      <div class=\"col-2\"></div>\n      <small class=\"form-text col-10 errorMessage\"\n             *ngIf=\"articleForm.get('price').touched && articleForm.get('price').status == 'INVALID'\">\n        Bitte gebe einen gültigen Preis ein\n      </small>\n    </div>\n\n    <!-- Aktionspreis -->\n    <div class=\"form-group row\"\n         [ngClass]=\"{'has-error' : articleForm.get('promotionPrice').touched && articleForm.get('promotionPrice').status == 'INVALID'}\">\n\n      <label class=\"col-2\">Aktionspreis</label>\n      <input type=\"number\" class=\"form-control col-10\" formControlName=\"promotionPrice\" step=\"0.01\" min=\"0.01\" value=\"0.00\">\n\n      <div class=\"col-2\"></div>\n      <small class=\"form-text col-10 errorMessage\"\n             *ngIf=\"articleForm.get('price').touched && articleForm.get('promotionPrice').status == 'INVALID'\">\n        Bitte gebe einen gültigen Aktionspreis ein\n      </small>\n    </div>\n\n    <!-- Buttons -->\n    <button class=\"btn btn-primary\" (click)=\"saveArticle()\" [disabled]=\"articleForm.status == 'INVALID'\"\n            type=\"submit\">\n      Speichern\n    </button>\n    <button class=\"btn btn-tertiary\" (click)=\"cancelEdit()\">\n      Abbrechen\n    </button>\n\n  </form>\n\n</div>\n"

/***/ }),

/***/ 253:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h1 class=\"headingArticleList\">{{ headline }}</h1>\n\n  <div class=\"row\">\n    <div class=\"col-3\" *ngFor=\"let article of articles | orderBy: 'name'; let i = index\">\n      <div class=\"card hoverable\" [ngClass]=\"{'isInCart' : article.isInCart}\">\n        <div class=\"card-image-parent\">\n          <div class=\"card-image\">\n            <img src=\"data:image/png;base64,{{ article.image }}\"\n                 alt=\"{{ article.name }}\"\n                 onerror=\"this.src='/assets/img/noImagePlaceholder.png'\"/>\n          </div>\n\n          <div class=\"card-image-cart\" *ngIf=\"article.numberInCart > 0\">\n            <div class=\"outer\">\n              <div class=\"middle\">\n                <div class=\"inner\">\n                  <span class=\"card-image-cart-number\">{{ article.numberInCart}}</span>\n                  <span class=\"card-image-cart-text\">In Ihrem<br/>Warenkorb</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"card-block\">\n          <h4 class=\"card-title\">{{ article.name }}</h4>\n          <p class=\"card-text\">{{ article.description }}</p>\n\n          <p>\n            <span class=\"card-price\" [ngClass]=\"{'price-cross' : article.promotionPrice}\">{{article.price | currency : 'EUR' : true }}</span>\n            <span class=\"card-promotionPrice\">{{article.promotionPrice | currency : 'EUR' : true }}</span>\n          </p>\n\n          <div class=\"card-cart\" *ngIf=\"article.numberInCart <= 0\">\n            <img *ngIf=\"!article.isInCart\" (click)=\"addArticleToCart(article)\" src=\"/assets/icons/shopping-cart.svg\"\n                 class=\"icon\"/>\n          </div>\n\n          <div class=\"card-cart-number\" *ngIf=\"article.numberInCart > 0\">\n            <button class=\"btn btn-tertiary btn-cart\" (click)=\"decreaseArticleNumber(article)\">\n              <img src=\"/assets/icons/remove-middle.svg\" class=\"icon\"/>\n            </button>\n            <button class=\"btn btn-tertiary btn-cart\" (click)=\"increaseArticleNumber(article)\">\n              <img src=\"/assets/icons/add-middle.svg\" class=\"icon\"/>\n            </button>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ 254:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-dialog\">\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\">{{title}}</h4>\n      <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\n    </div>\n    <div class=\"modal-body\">\n      <p>{{message}}</p>\n\n      <ng-template [ngIf]=\"articles?.length > 0\">\n        <div class=\"cart-article\" *ngFor=\"let article of articles\">\n          <div class=\"row\">\n            <div class=\"cart-article-description col-6\">\n              <span class=\"cart-article-description-name\">{{ article.name }}</span>\n              <br/>\n              <span class=\"cart-article-description-description\">{{ article.description }}</span>\n            </div>\n            <div class=\"cart-article-count col-2\">\n              <img src=\"/assets/icons/add-middle.svg\" class=\"icon\" (click)=\"increaseArticleNumber(article)\"/>\n              {{ article.numberInCart }}\n              <img src=\"/assets/icons/remove-middle.svg\" class=\"icon\" (click)=\"decreaseArticleNumber(article)\"/>\n            </div>\n            <div class=\"cart-article-price col-2\">\n              <span [ngClass]=\"{'price-cross' : article.promotionPrice}\">{{ article.price | currency : 'EUR' : true }}</span>\n              <span class=\"modal-promotionPrice\" *ngIf=\"article.promotionPrice\">{{ article.promotionPrice | currency : 'EUR' : true }}</span>\n            </div>\n            <div class=\"cart-article-totalPrice col-2\">\n              {{ article.numberInCart * (article.promotionPrice ? article.promotionPrice : article.price) | currency : 'EUR' : true }}\n            </div>\n          </div>\n        </div>\n\n        <hr style=\"border: 1px solid #000;\">\n\n        <div class=\"row\">\n          <div class=\"col-6\"></div>\n          <div class=\"col-4\">\n            <span class=\"cart-totalPrice-label\">Gesamtbetrag</span>\n            <br/>\n            <span class=\"cart-MwSt-label\">inkl. Mehrwertsteuer</span>\n          </div>\n          <div class=\"cart-totalPrice col-2\">{{ cartService.totalPrice | currency : 'EUR' : true }}</div>\n        </div>\n\n        <hr style=\"border: 1px solid #000;\">\n      </ng-template>\n    </div>\n    <div class=\"modal-footer\" *ngIf=\"articles?.length > 0\">\n      <button type=\"button\" class=\"btn btn-quaternary\" (click)=\"confirm()\">Jetzt bestellen</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 255:
/***/ (function(module, exports) {

module.exports = "<div class=\"footer\">\n\n  <div class=\"container \">\n    <div class=\"row footerRow\">\n\n      <div class=\"col-3\">\n        <img src=\"/assets/icons/delivery-in-progress.svg\" class=\"iconFooter hoverableBig\"/>\n        <div class=\"iconSubtitle\">Schnelle Lieferung</div>\n      </div>\n\n      <div class=\"col-3\">\n        <img src=\"/assets/icons/vegetables.svg\" class=\"iconFooter hoverableBig\"/>\n        <div class=\"iconSubtitle\">Aus unserer Region</div>\n      </div>\n\n      <div class=\"col-3\">\n        <img src=\"/assets/icons/heart.svg\" class=\"iconFooter hoverableBig\"/>\n        <div class=\"iconSubtitle\">Wir lieben Kaufland</div>\n      </div>\n\n      <div class=\"col-3\">\n        <img src=\"/assets/icons/chat_2.svg\" class=\"iconFooter hoverableBig\"/>\n        <div class=\"iconSubtitle\">24/7 Support</div>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"container\">\n  <h1 class=\"h1\">Unser Sortiment</h1>\n\n  <table class=\"footer-table\">\n    <tr>\n      <td><span class=\"clickable\">Aktuelle Angebote</span></td>\n      <td><span class=\"clickable\">Konserven & Feinkost</span></td>\n      <td><span class=\"clickable\">Getränke</span></td>\n      <td><span class=\"clickable\">Haushalt</span></td>\n    </tr>\n    <tr>\n      <td><span class=\"clickable\">Obst & Gemüse</span></td>\n      <td><span class=\"clickable\">Kühlprodukte</span></td>\n      <td><span class=\"clickable\">Drogerie</span></td>\n      <td><span class=\"clickable\">Zigaretten & Tabak</span></td>\n    </tr>\n    <tr>\n      <td><span class=\"clickable\">Frühstück</span></td>\n      <td><span class=\"clickable\">Tiefkühlkost</span></td>\n      <td><span class=\"clickable\">Baby & Kind</span></td>\n      <td><span class=\"clickable\"></span></td>\n    </tr>\n    <tr>\n      <td><span class=\"clickable\">Kochen & Backen</span></td>\n      <td><span class=\"clickable\">Süßes & Salziges</span></td>\n      <td><span class=\"clickable\">Tierbedarf</span></td>\n      <td><span class=\"clickable\"></span></td>\n    </tr>\n  </table>\n\n  <div class=\"footer-logo\">\n    <a href=\"/\">\n      <img src=\"/assets/img/kl_logo.svg\" class=\"hoverableBig\"/>\n    </a>\n  </div>\n</div>\n"

/***/ }),

/***/ 256:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <div class=\"header-top\">\n    <div class=\"header-logo\">\n      <a href=\"/\">\n        <img src=\"/assets/img/kl_logo.svg\"/>\n      </a>\n    </div>\n\n    <div class=\"header-navigation\" *ngIf=\"showNavigation\">\n      <div class=\"header-content\">\n        <ul>\n          <li><a href=\"/\">Sortiment</a></li>\n          <li><a href=\"#\" (click)=\"showCartModal()\">Warenkorb</a></li>\n          <li><a href=\"/admin\">Administration</a></li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"header-right\">\n      <div class=\"header-content\">\n        <ng-template [ngIf]=\"showCart == true\">\n          <img src=\"/assets/icons/warenkorb.png\" (click)=\"showCartModal()\" class=\"clickable icon\"/>\n          <div class=\"cart-info\">\n            <b>{{ cartService.totalPrice | currency : 'EUR' : true }}</b><br/>\n            {{ cartService.cart.length }} Artikel\n          </div>\n        </ng-template>\n\n      </div>\n    </div>\n\n    <div style=\"clear: both\"></div>\n  </div>\n\n  <div class=\"header-image\" [ngStyle]=\"{'background-image': 'url(' + headerImage + ')'}\" *ngIf=\"headerImage\"></div>\n\n</div>\n"

/***/ }),

/***/ 257:
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n<app-articleList [articles]=\"articles\" headline=\"Aktuelle Angebote\"></app-articleList>\n\n<div class=\"spacer80\"></div>\n<app-information [information]=\"i1\"></app-information>\n<div class=\"spacer40\"></div>\n<app-information [information]=\"i2\" [imageLeft]=\"false\"></app-information>\n\n<app-footer></app-footer>\n"

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

module.exports = "<div class=\"container information\">\n\n  <div class=\"information-image\"\n       [ngClass]=\"{'information-image-left' : imageLeft, 'information-image-right' : !imageLeft }\">\n    <img src=\"/assets/img/{{ info.imageName }}\"/>\n  </div>\n\n  <div class=\"information-content\">\n    <h2 class=\"headingInformation\">{{ info.headline }}</h2>\n    <p>{{ info.text }}</p>\n  </div>\n\n  <div style=\"clear: both\"></div>\n\n</div>\n"

/***/ }),

/***/ 259:
/***/ (function(module, exports) {

module.exports = "<app-header showCart=\"{{ false }}\" headerImage=\"/assets/img/bestellbestaetigung.jpg\"></app-header>\n\n<div class=\"container\">\n  <h1>Bestellbestätigung</h1>\n\n  <p>\n    Vielen Dank für Ihre Bestellung. Wir werden Sie benachrichtigen, sobald Ihr(e) Artikel versandt wurde(n).\n    <br/>\n    Sie finden das voraussichtliche Lieferdatum weiter unten. Um Ihre Bestellung anzusehen oder zu stornieren,\n    kontaktieren Sie den Service Desk.\n  </p>\n\n  <p><b>Voraussichtliches Lieferdatum: </b>{{ deliveryDate | date : 'fullDate' }}</p>\n\n  <p style=\"text-align: center;\">\n    <button class=\"btn btn-quaternary\">\n      <a href=\"/\">\n        Weiter einkaufen\n      </a>\n    </button>\n  </p>\n</div>\n\n<app-footer></app-footer>\n"

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CartService = (function () {
    function CartService() {
        this.cart = [];
        this.totalPrice = 0;
    }
    CartService.prototype.addArticle = function (article) {
        article.isInCart = true;
        article.numberInCart++;
        if (article.promotionPrice) {
            this.totalPrice += parseFloat(article.promotionPrice);
        }
        else {
            this.totalPrice += parseFloat(article.price);
        }
        this.cart.push(article);
    };
    CartService.prototype.addExistingArticle = function (pArticle) {
        pArticle.numberInCart++;
        if (pArticle.promotionPrice) {
            this.totalPrice += parseFloat(pArticle.promotionPrice);
        }
        else {
            this.totalPrice += parseFloat(pArticle.price);
        }
    };
    CartService.prototype.removeArticle = function (article) {
        article.isInCart = false;
        var index = this.cart.indexOf(article, 0);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
    };
    CartService.prototype.removeExistingArticle = function (pArticle) {
        pArticle.numberInCart--;
        if (pArticle.promotionPrice) {
            this.totalPrice -= parseFloat(pArticle.promotionPrice);
        }
        else {
            this.totalPrice -= parseFloat(pArticle.price);
        }
        if (pArticle.numberInCart == 0) {
            this.removeArticle(pArticle);
        }
    };
    CartService.prototype.clearCart = function () {
        this.cart = [];
        this.totalPrice = 0;
    };
    return CartService;
}());
CartService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], CartService);

//# sourceMappingURL=cart.service.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__entities_Article__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__image_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__entities_ArticleJson__ = __webpack_require__(170);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ArticleService = ArticleService_1 = (function () {
    function ArticleService(http, imageService) {
        this.http = http;
        this.imageService = imageService;
        this.articles = [];
    }
    ArticleService.prototype.loadAllArticles = function () {
        var _this = this;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].backendUrl + "articles")
            .map(function (response) { return _this.mapArrayToInternalModel(response.json()._embedded.articles); });
    };
    ArticleService.prototype.loadArticle = function (url) {
        var _this = this;
        return this.http.get(url)
            .map(function (response) { return _this.mapToInternalModel(response.json()); });
    };
    ArticleService.prototype.createArticle = function (pArticle) {
        var jsonArticle = ArticleService_1.mapToExternalModel(pArticle);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].backendUrl + "articles", JSON.stringify(jsonArticle), options);
    };
    ArticleService.prototype.updateArticle = function (pArticle) {
        var jsonArticle = ArticleService_1.mapToExternalModel(pArticle);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.put(pArticle.detailLink, JSON.stringify(jsonArticle), options);
    };
    ArticleService.prototype.removeArticle = function (pArticle) {
        return this.http.delete(pArticle.detailLink);
    };
    ArticleService.mapToExternalModel = function (pArticle) {
        var articleJson = new __WEBPACK_IMPORTED_MODULE_7__entities_ArticleJson__["a" /* ArticleJson */]();
        articleJson.name = pArticle.name;
        articleJson.description = pArticle.description;
        articleJson.price = pArticle.price;
        articleJson.promotionPrice = pArticle.promotionPrice;
        articleJson.image = pArticle.image;
        return articleJson;
    };
    ArticleService.prototype.mapArrayToInternalModel = function (pJsonData) {
        var articles = [];
        for (var _i = 0, pJsonData_1 = pJsonData; _i < pJsonData_1.length; _i++) {
            var article = pJsonData_1[_i];
            articles.push(this.mapToInternalModel(article));
        }
        return articles;
    };
    ArticleService.prototype.mapToInternalModel = function (pArticle) {
        var article = new __WEBPACK_IMPORTED_MODULE_5__entities_Article__["a" /* Article */]();
        article.name = pArticle.name;
        article.description = pArticle.description;
        article.price = pArticle.price;
        article.promotionPrice = pArticle.promotionPrice;
        article.detailLink = pArticle._links.self.href;
        this.imageService.loadImage(pArticle._links.image.href).subscribe(function (base64Image) {
            article.image = base64Image;
        }, function (error) {
            console.log(error);
        });
        return article;
    };
    return ArticleService;
}());
ArticleService = ArticleService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__image_service__["a" /* ImageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__image_service__["a" /* ImageService */]) === "function" && _b || Object])
], ArticleService);

var ArticleService_1, _a, _b;
//# sourceMappingURL=article.service.js.map

/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(162);


/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    backendUrl: "http://localhost:8080/"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entities_Image__ = __webpack_require__(99);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ImageService = (function () {
    function ImageService(http) {
        this.http = http;
    }
    ImageService.prototype.loadImage = function (imageUrl) {
        return this.http.get(imageUrl)
            .map(function (response) { return response.json()['content']; });
    };
    ImageService.prototype.createImage = function (base64Image) {
        var image = new __WEBPACK_IMPORTED_MODULE_4__entities_Image__["a" /* Image */]();
        image.content = base64Image;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].backendUrl + "images", JSON.stringify(image), options);
    };
    return ImageService;
}());
ImageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], ImageService);

var _a;
//# sourceMappingURL=image.service.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Article; });
var Article = (function () {
    function Article() {
        this.isInCart = false;
        this.numberInCart = 0;
    }
    return Article;
}());

//# sourceMappingURL=Article.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Image; });
var Image = (function () {
    function Image() {
    }
    return Image;
}());

//# sourceMappingURL=Image.js.map

/***/ })

},[523]);
//# sourceMappingURL=main.bundle.js.map