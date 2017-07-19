<?php
/**
 * Location Templates
 *
 */
class Elgentos_Vrshop_Adminhtml_Model_System_Config_Source_LocationSelector
{

    /**
     * Options getter
     *
     * @return array
     */
    public function toOptionArray()
    {
        return array(
            array('value' => 'clean', 'label'=>Mage::helper('adminhtml')->__('Clean')),
            array('value' => 'space-night', 'label'=>Mage::helper('adminhtml')->__('Sky City at night')),
            array('value' => 'space-dawn', 'label'=>Mage::helper('adminhtml')->__('Sky City at dawn')),
        );
    }
}
?>