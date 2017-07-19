<?php

$installer = $this;
$installer->startSetup();

$installer->addAttribute(Mage_Catalog_Model_Product::ENTITY, 'product_model3d', array(
  'type'              => 'varchar',
  'backend'           => 'vrshop/product_attribute_backend_model3d',
  'frontend'          => '',
  'label'             => '3d Model',
  'input'             => 'file',
  'class'             => '',
  'global'            => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
  'visible'           => true,
  'required'          => false,
  'user_defined'      => false,
  'default'           => '',
  'searchable'        => false,
  'filterable'        => false,
  'comparable'        => false,
  'visible_on_front'  => false,
  'unique'            => false,
  'group'             => 'Virtual Reality'
));

$installer->endSetup();