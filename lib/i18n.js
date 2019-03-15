// Translation lib - i18n

// Mode strict
"use strict";

// Dependencies
const i18n = require('i18n');
const path = require('path');

/**
 * Function for configure translations
 * @returns {*}
 */
 function setupi18n() {
    i18n.configure({
        directory: path.join(__dirname, '..', 'locales'),
        autoReload: true,
        syncFiles: true,
        defaultLocale: "es",
        locales: ["es", "en"],
        cookie: process.env.COOKIE_I18N || 'devrock-lang',
    });
    // locale by default
    i18n.setLocale(process.env.DEFAULT_LOCALE || 'es');
    return i18n;
}

// Export
module.exports = setupi18n;
