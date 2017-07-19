<?php

class Elgentos_Vrshop_Model_Product_Attribute_Backend_Model3d extends Mage_Eav_Model_Entity_Attribute_Backend_Abstract
{
    public function beforeSave($object)
    {
        // Variables
        $attributeName = $this->getAttribute()->getName();
        $allowedExtensions = ['gltf'];
        $uploadFolder = Mage::getBaseDir('media') . DS . '3dmodels';
        $objectData = $object->getData($attributeName); // ?

        // Delete object
        if (is_array($objectData) && !empty($objectData['delete'])) {
            $object->setData($attributeName, '');
            $this->getAttribute()->getEntity()->saveAttribute($object, $attributeName);
            return;
        }

        try {
            
            // Set up uploader
            $uploader = new Mage_Core_Model_File_Uploader('product[product_model3d]');
            $uploader->setAllowedExtensions($allowedExtensions);
            $uploader->setAllowRenameFiles(true);

            $uploadResult = $uploader->save($uploadFolder);
            $object->setData($attributeName, $uploadResult['file']);

            $this->getAttribute()->getEntity()->saveAttribute($object, $attributeName);

        } catch (Exception $e) {

            // Error has occured. Provide error data.
            Mage::logException($e);
            Mage::getSingleton('adminhtml/session')->addError('Could not upload 3d model; ' . $e->getMessage());
            return;
        }
    }
}