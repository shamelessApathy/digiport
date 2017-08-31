<?php 
/**
 * Plugin Name: Clock
 * Plugin URI: https://aplaceformyhead.org
 * Description: A simple javascript based clock, soon to have timezone feature
 * Version: 0.0.1
 * Author:Brian Moniz
 * License: ISC
 * License URI: https://opensource.org/licenses/ISC/
 * Text domain: clock
 */

class Clock
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
		add_shortcode('b-clock', array($this, 'render_clock'));
	}

	/**
	 * Loads all of the plugins CSS and JS assets
	 *
	 * @return void
	 */

	public function load_assets()
	{
		wp_register_style('clock-css', plugin_dir_url(__FILE__) . 'css/clock.css');
		wp_register_script('clock-js', plugin_dir_url(__FILE__) . 'js/clock.js', array('jquery'));

		wp_enqueue_style('clock-css');
		wp_enqueue_script('clock-js');
	}

	/**
	 * Renders the admin sidebar link to the plugins settings page
	 *
	 * @return void
	 */
	public function menu_item()
	{
		add_menu_page(__('Clock','clock'), __('Clock', 'clock'), 'edit_pages', 'clock', array($this, 'render_leaderboard'), 'dashicons-image-clock');
	}

	public function render_leaderboard()
	{

	}
	/**
	 * Renders a new instance of the clock on the front-end
	 *
	 * @param Array $args
	 * @return void
	 */

	public function render_clock($args)
	{
		ob_start();
		//$tz = $args['tz'];
?>
	<div id='clock-box'>
	<div class='clock' tz="<?php echo $tz ?>">
	<img id='second' src="<?php echo plugin_dir_url(__FILE__) . '/img/redline.png';?>"/>
	<img id='minute' src="<?php echo plugin_dir_url(__FILE__) . '/img/blackline.png';?>"/>
	<img id='hour' src="<?php echo plugin_dir_url(__FILE__)  . '/img/blackline.png';?>"/>
	</div>


</div>

<?php
		$html = ob_get_contents();

		ob_end_clean();

		return $html;
	}
}

new Clock();