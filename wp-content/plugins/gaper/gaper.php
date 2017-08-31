<?php 
/**
 * Plugin Name: Gaper
 * Plugin URI: https://aplaceformyhead.org
 * Description: Dodge the skiers as you make your way to the lodge!
 * Version: 0.0.1
 * Author:Brian Moniz
 * License: ISC
 * License URI: https://opensource.org/licenses/ISC/
 * Text domain: gaper
 */

class Gaper
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

		add_shortcode('gaper', array($this, 'render_gaper'));
	}

	/**
	 * Loads all of the plugins CSS and JS assets
	 *
	 * @return void
	 */

	public function load_assets()
	{
		wp_register_style('gaper-css', plugin_dir_url(__FILE__) . 'css/gaper.css');
		wp_register_script('gaper-js', plugin_dir_url(__FILE__) . 'js/gaper.js', array('jquery'));

		wp_enqueue_style('gaper-css');
		wp_enqueue_script('gaper-js');
	}

	/**
	 * Renders the admin sidebar link to the plugins settings page
	 *
	 * @return void
	 */
	public function menu_item()
	{
		add_menu_page(__('Gaper','gaper'), __('Gaper', 'gaper'), 'edit_pages', 'gaper', array($this, 'render_leaderboard'), 'dashicons-image-filter');
	}

	public function render_leaderboard()
	{

	}
	/**
	 * Renders a new isntance of the game on the front-end
	 *
	 * @param Array $args
	 * @return void
	 */

	public function render_gaper()
	{
		ob_start();
?>
	<div class='gaper' data-plugin-dir-url="<?php echo plugin_dir_url(__FILE__);?>">
		<div class='gaper-inner-container'>
			<div id='anchor'>
			<div id='you-win'>
				<p>You Win!!!</p>
				<div id='next'>
					<p>Next Level</p>
				</div>
			</div>
			</div>
			<div class='start'></div>
			<div id='laneOne' class='lane'></div>
			<div id='laneTwo' class='lane'><img class='left' src="<?php echo plugin_dir_url(__FILE__) . '/img/safe_zone.jpg'?>"/><img class='right' src="<?php echo plugin_dir_url(__FILE__) . '/img/safe_zone.jpg'?>"/></div>
			<div id='laneThree' class='lane'></div>
			<div id='laneFour' class='lane'><img class='left' src="<?php echo plugin_dir_url(__FILE__) . '/img/safe_zone.jpg'?>"/><img class='right' src="<?php echo plugin_dir_url(__FILE__) . '/img/safe_zone.jpg'?>"/></div>
			<div id='laneFive' class='lane'></div>
			<div class='end'>
			<div class='dead'>You are dead!!</div>
			<div id='play-again'>Play Again</div>
			<p style='color:black;'>Level:<span class='gaper-score'></span></p>
			<div id='lodge'>
			<img src="<?php echo plugin_dir_url(__FILE__) . 'img/log_cabin.png';?>"/>
			</div>
			</div>
		</div>
	</div>
	<div class='non-compatible'><h1>Sorry this game was not developed to be viewed on mobile browsers!</h1></div>
	<div class='dpad-container'>
		<div class='dpad-square' id='dpad-up'></div>
		<div class='dpad-square' id='dpad-left'></div>
		<div class='dpad-square' id='dpad-right'></div>
		<div class='dpad-square' id='dpad-down'></div>
	</div>

<?php
		$html = ob_get_contents();

		ob_end_clean();

		return $html;
	}
}

new Gaper();