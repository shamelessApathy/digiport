<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'digiport');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'proline55');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'y51{,Ge;Ss%SAJd5,X=?qwa[42e6_-+]hXA5A[4i/;F]sl%8SqvvA?P2A&Mr*K6k');
define('SECURE_AUTH_KEY',  'GYpti=!{2 FU)hj>6YtXXv(P?x7^@tDj 8mugl7w>xyA&ou$~UK`@ExNFt,&X2s6');
define('LOGGED_IN_KEY',    'U)kbKy^((  aN8 ?ZaRb/au9CtaXCq1$c+P0rroBH%2^}h Nx>71w<KLYx*.tal~');
define('NONCE_KEY',        '@OHw)Kw{Fe,(QJXoG1+k0hgrc|t7F@nHJ::H?7)FSi{e^7N4.cNXG!/&taJULHh6');
define('AUTH_SALT',        'PJ^3)jn IalWEocMO7mK:z.+Vfs#O+ag>$H<{vY1wUF2_LKJ3d@U=NR`5C+7zXH&');
define('SECURE_AUTH_SALT', '}FfD`cOzj$$$+t(q/8H L, %a2t_/L6TohsEl(&~q,hgKk^AeJVeKk~bX(1Y2)YS');
define('LOGGED_IN_SALT',   '(G/ lGJTK<v.<|J0DmHE`zJ-gvU#GnV9vb<|V%gJV`10>0]~]*g}e?qR >DH_z4~');
define('NONCE_SALT',       '_08M+0lt96gY^`g7F<wSLSV[3[y];nPyurQf^nAN!J>GA`%Z9R~lP<4OA2fXQGY9');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
