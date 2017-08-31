<?php 
/**
 * Plugin Name: Utah Alimony Calculator
 * Plugin URI: https://aplaceformyhead.org
 * Description: A calculator used to determine an estimate for alimony owed
 * Version: 0.0.1
 * Author:Brian Moniz
 * License: ISC
 * License URI: https://opensource.org/licenses/ISC/
 * Text domain: alimony
 */

class AlimonyCalc
{
/**
 * Adds hook listeners and prepares class variables
 *
 * @return void
 */

	public function __construct()
	{
		add_action('admin_menu', array($this, 'menu_item'));
		add_action('wp_head', array($this, 'load_assets'));

		add_shortcode('alimony', array($this, 'render_alimony'));
	}

	/**
	 * Loads all of the plugins CSS and JS assets
	 *
	 * @return void
	 */

	public function load_assets()
	{
		wp_register_style('alimony-css', plugin_dir_url(__FILE__) . 'css/calcstyle.css');
		wp_register_script('alimony-js', plugin_dir_url(__FILE__) . 'js/script.js', array('jquery'));

		wp_enqueue_style('alimony-css');
		wp_enqueue_script('alimony-js');
	}

	/**
	 * Renders the admin sidebar link to the plugins settings page
	 *
	 * @return void
	 */
	public function menu_item()
	{
		//add_menu_page(__('Alimony Calculator','alimony calculator'), __('Alimony Calculator', 'alimony calculator'), 'edit_pages', 'alimony', function(){}, 'dashicons-building');
	}


	/**
	 * Renders a new instance of the calculator on the front-end
	 *
	 * @param Array $args
	 * @return void
	 */

	public function render_alimony()
	{
		ob_start();
?>
<div class='calc-wrapper' data-plugin-dir-url="<?php echo plugin_dir_url(__FILE__);?>">
	<div class='calculator-container'>
		<h1 style='text-align:center;'>Utah Alimony Calculator</h1>
		<p style='text-align:center; font-size:1.2em;'> This calculator is to be used as a basic estimate for determining alimony payments, 
		Utah does not have an exact formula and is a subjective state when it comes to determining alimony.</p>
		<table class='table-style'>
		<tr><td class='gray'><p class='form-label'>Payor's monthly income:</p></td><td><input class='fields' type='text' id='your-income'></td></tr>
		<tr><td class='gray'><p class='form-label'>Payee's monthly income:</td><td><input class='fields' type='text' id='spouse-income'></input></p></td></tr>
		<tr><td class='gray'><p class='form-label'>Marriage Length (years):</td><td><input class='fields' type='text' id='marriage-length'></input></p></td></tr>
		<tr><td colspan='2'><input type='checkbox' id='children'>Do you have children you will be receiving child support for?</input></td></tr><br>
		<br>
		<tr><td colspan='2' class='gray'><button type='button' id='submit'>Submit</button></td></tr>
		</table>
		<br><br>
		<div class='answer gray'></div>
	</div>
</div>
</body>
<?php
		$html = ob_get_contents();

		ob_end_clean();

		return $html;
	}
}

new AlimonyCalc();