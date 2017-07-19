<?php

class Elgentos_Vrshop_IndexController extends Mage_Core_Controller_Front_Action {

    /**
     * Get detailed list of VR products
     */
    public function indexAction() {

        $products = [];

        // Get VR products
        $product_collection = Mage::getModel('catalog/product')->getCollection()
            ->addAttributeToSelect('*')
            ->addAttributeToFilter('product_model3d', array('notnull' => true))
            ->load();

        foreach ($product_collection as $product) {

            $productEntry = [];
            $categoryId = 0;
            $categoryName = '';
            $productId = $product->getId();

            foreach ($product->getCategoryIds() as $category_id) {
                $_cat = Mage::getModel('catalog/category')->load($category_id);

                $categoryId = $category_id;
                $categoryName = $_cat->getName();
            }

            if($products[0][$categoryId]) {
                $productEntry['id'] = $product->getId();
                $productEntry['name'] = $product->getName();
                $productEntry['price'] = $product->getPrice();
                $productEntry['thumbnail'] = $product->getSmallImageUrl();
                $productEntry['image'] = $product->getBigImageUrl();
                $productEntry['description'] = $product['short_description'];
                $productEntry['3dmodel'] = $product['product_model3d'];

                array_push($products[0][$categoryId]['products'], $productEntry);
            } else {
                $productEntry[$categoryId] = [];
                $productEntry[$categoryId]['name'] = $categoryName;
                $productEntry[$categoryId]['products'][$productId]['id'] = $product->getId();
                $productEntry[$categoryId]['products'][$productId]['name'] = $product->getName();
                $productEntry[$categoryId]['products'][$productId]['price'] = $product->getPrice();
                $productEntry[$categoryId]['products'][$productId]['thumbnail'] = $product->getSmallImageUrl();
                $productEntry[$categoryId]['products'][$productId]['image'] = $product->getBigImageUrl();
                $productEntry[$categoryId]['products'][$productId]['description'] = $product['short_description'];
                $productEntry[$categoryId]['products'][$productId]['3dmodel'] = $product['product_model3d'];

                array_push($products, $productEntry);
            }
        }

        // Return products array
        die(json_encode($products));
    }


    /**
     * Get Location Details (promotion banners, templates)
     */
    public function locationdetailsAction() {
        $location = [];
        $location['promotion1'] = Mage::getStoreConfig('vrshop/vrshop_group/vrshop_promotion1');
        $location['promotion2'] = Mage::getStoreConfig('vrshop/vrshop_group/vrshop_promotion2');
        $location['template'] = Mage::getStoreConfig('vrshop/vrshop_group/vrshop_location');
        $location['shop_name'] = Mage::app()->getWebsite()->getName();
        $location['shop_id'] = Mage::app()->getWebsite()->getId();
        $location['shop_logo'] = Mage::getStoreConfig('design/header/logo_src', $location['shop_id']);
        die(json_encode($location));
    }
}