<?php
/**
 * Plugin Name:       Nepali DatePicker Studio
 * Plugin URI:        https://kushalkhadkaa.github.io/nepali-datepicker-studio/
 * Description:       Add Bikram Sambat (BS) Nepali date picker fields anywhere on your WordPress site using shortcodes or Gutenberg blocks.
 * Version:           1.2.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            Kushal Khadka
 * Author URI:        https://github.com/kushalkhadkaa
 * License:           MIT
 * Text Domain:       nepali-datepicker-studio
 */

defined('ABSPATH') || exit;

define('NDP_VERSION',   '1.2.0');
define('NDP_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('NDP_PLUGIN_URL', plugin_dir_url(__FILE__));

/* ──────────────────────────────────────────────────────────────────
   1. Enqueue scripts & styles
─────────────────────────────────────────────────────────────────── */
add_action('wp_enqueue_scripts',    'ndp_enqueue_assets');
add_action('admin_enqueue_scripts', 'ndp_enqueue_assets');

function ndp_enqueue_assets() {
    wp_enqueue_style(
        'nepali-datepicker-studio',
        NDP_PLUGIN_URL . 'assets/nepali-datepicker.css',
        [],
        NDP_VERSION
    );
    wp_enqueue_script(
        'nepali-datepicker-studio',
        NDP_PLUGIN_URL . 'assets/nepali-datepicker.js',
        [],
        NDP_VERSION,
        true
    );
}

/* ──────────────────────────────────────────────────────────────────
   2. Shortcode: [nepali_datepicker]
   Attributes: id, name, theme, lang, mode, placeholder, class,
               show_ad_date, export_ad, value, required
─────────────────────────────────────────────────────────────────── */
add_shortcode('nepali_datepicker', 'ndp_shortcode');

function ndp_shortcode($atts) {
    $a = shortcode_atts([
        'id'           => 'ndp-' . uniqid(),
        'name'         => 'nepali_date',
        'theme'        => 'classic-light',
        'lang'         => 'ne',
        'mode'         => 'single',
        'placeholder'  => '',
        'class'        => '',
        'show_ad_date' => 'true',
        'export_ad'    => '',
        'value'        => '',
        'required'     => 'false',
    ], $atts, 'nepali_datepicker');

    $id       = esc_attr($a['id']);
    $name     = esc_attr($a['name']);
    $class    = esc_attr($a['class']);
    $ph       = esc_attr($a['placeholder'] ?: ($a['lang'] === 'ne' ? 'मिति छान्नुहोस्' : 'Select date'));
    $required = $a['required'] === 'true' ? 'required' : '';
    $exportEl = $a['export_ad'] ? ', exportAdInput: ' . json_encode('#' . esc_attr($a['export_ad'])) : '';
    $adField  = $a['export_ad']
        ? '<input type="hidden" id="' . esc_attr($a['export_ad']) . '" name="' . esc_attr($a['export_ad']) . '">'
        : '';

    ob_start(); ?>
<span class="ndp-wp-wrapper <?php echo $class; ?>">
    <input
        type="text"
        id="<?php echo $id; ?>"
        name="<?php echo $name; ?>"
        placeholder="<?php echo $ph; ?>"
        value="<?php echo esc_attr($a['value']); ?>"
        class="ndp-wp-input"
        autocomplete="off"
        <?php echo $required; ?>
        readonly
    >
    <?php echo $adField; ?>
</span>
<script>
(function () {
    function init() {
        if (typeof window.NepaliDatePicker === 'undefined') { return setTimeout(init, 80); }
        new window.NepaliDatePicker('#<?php echo $id; ?>', {
            theme:       <?php echo json_encode($a['theme']); ?>,
            lang:        <?php echo json_encode($a['lang']); ?>,
            mode:        <?php echo json_encode($a['mode']); ?>,
            showAdDate:  <?php echo $a['show_ad_date'] === 'false' ? 'false' : 'true'; ?><?php echo $exportEl; ?>
        });
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
    else { init(); }
})();
</script>
    <?php
    return ob_get_clean();
}

/* ──────────────────────────────────────────────────────────────────
   3. Shortcode: [nepali_converter]
─────────────────────────────────────────────────────────────────── */
add_shortcode('nepali_converter', 'ndp_converter_shortcode');

function ndp_converter_shortcode($atts) {
    $a  = shortcode_atts(['id' => 'ndp-conv-' . uniqid(), 'theme' => 'classic-light', 'lang' => 'ne'], $atts, 'nepali_converter');
    $id = esc_attr($a['id']);
    ob_start(); ?>
<div id="<?php echo $id; ?>"></div>
<script>
(function(){
    function init(){
        if(typeof window.NepaliConverterWidget==='undefined'){return setTimeout(init,80);}
        new window.NepaliConverterWidget('#<?php echo $id;?>',{theme:<?php echo json_encode($a['theme']);?>,lang:<?php echo json_encode($a['lang']);?>});
    }
    document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
</script>
    <?php
    return ob_get_clean();
}

/* ──────────────────────────────────────────────────────────────────
   4. Gutenberg block registration
─────────────────────────────────────────────────────────────────── */
add_action('init', 'ndp_register_block');

function ndp_register_block() {
    if (!function_exists('register_block_type')) return;
    register_block_type('nepali-datepicker-studio/datepicker', [
        'attributes' => [
            'theme'       => ['type' => 'string', 'default' => 'classic-light'],
            'lang'        => ['type' => 'string', 'default' => 'ne'],
            'mode'        => ['type' => 'string', 'default' => 'single'],
            'label'       => ['type' => 'string', 'default' => ''],
            'name'        => ['type' => 'string', 'default' => 'nepali_date'],
            'placeholder' => ['type' => 'string', 'default' => ''],
            'showAdDate'  => ['type' => 'boolean', 'default' => true],
        ],
        'render_callback' => 'ndp_block_render',
        'editor_script'   => 'nepali-datepicker-studio-block',
    ]);
    wp_register_script(
        'nepali-datepicker-studio-block',
        NDP_PLUGIN_URL . 'assets/block.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components'],
        NDP_VERSION
    );
}

function ndp_block_render($attrs) {
    $sc_atts = array_map('esc_attr', [
        'theme'        => $attrs['theme']       ?? 'classic-light',
        'lang'         => $attrs['lang']        ?? 'ne',
        'mode'         => $attrs['mode']        ?? 'single',
        'name'         => $attrs['name']        ?? 'nepali_date',
        'placeholder'  => $attrs['placeholder'] ?? '',
        'show_ad_date' => ($attrs['showAdDate'] ?? true) ? 'true' : 'false',
    ]);
    return ndp_shortcode($sc_atts);
}

/* ──────────────────────────────────────────────────────────────────
   5. WooCommerce checkout field
─────────────────────────────────────────────────────────────────── */
if (class_exists('WooCommerce')) {
    add_filter('woocommerce_checkout_fields', 'ndp_woo_checkout_fields');
    function ndp_woo_checkout_fields($fields) {
        $fields['billing']['billing_nepali_date'] = [
            'label'       => __('Delivery Date (BS)', 'nepali-datepicker-studio'),
            'placeholder' => 'YYYY-MM-DD',
            'type'        => 'text',
            'class'       => ['form-row-wide'],
            'priority'    => 120,
        ];
        return $fields;
    }
    add_action('woocommerce_checkout_update_order_meta', 'ndp_woo_save_field');
    function ndp_woo_save_field($order_id) {
        if (!empty($_POST['billing_nepali_date'])) {
            update_post_meta($order_id, '_billing_nepali_date', sanitize_text_field($_POST['billing_nepali_date']));
        }
    }
    add_action('woocommerce_after_checkout_billing_form', 'ndp_woo_init_picker');
    function ndp_woo_init_picker() {
        echo '<script>document.addEventListener("DOMContentLoaded",function(){if(typeof NepaliDatePicker!=="undefined"){new NepaliDatePicker("#billing_nepali_date",{theme:"classic-light",lang:"ne"});}});</script>';
    }
}
