
Perseus Exercise Renderer for Kolibri
=====================================

What is this?
-------------

Kolibri is a Learning Management System / Learning App designed to run on low-power devices, targeting the needs of learners and teachers in contexts with limited infrastructure. See `learningequality.org/kolibri <https://learningequality.org/kolibri/>`__ for more info.

Perseus is Khan Academy's exercise question editor and renderer. See `github.com/Khan/perseus <https://github.com/Khan/perseus>`__ for more info.

This package is a wrapper around Perseus which allows it to be embedded and used within Kolibri.


Installation
------------

**This plugin is bundled with Kolibri - it is unlikely that you need to install it.**. If you are running a custom version, you can install it like this:


1. Inside your Kolibri virtual environment::

    pip install kolibri-perseus-exercise-plugin

2. Activate the plugin::

    kolibri plugin enable kolibri_exercise_perseus_plugin

3. Restart Kolibri.


Getting started with development
--------------------------------

1. Clone this repo.

2. Open terminal in your Kolibri repo.

3. Run the following commands, with your Kolibri development virtual env
   enabled::

    make clean
    pip install -e .
    pip install -e <KOLIBRI-PERSEUS-PLUGIN-LOCAL-PATH>
    kolibri plugin enable kolibri_exercise_perseus_plugin

4. Within the perseus plugin repo directory, run the following command, again using your kolibri dev virtualenv::

    cd kolibri_exercise_perseus_plugin
    yarn install
    cd ..
    make dist


Updating translation strings
----------------------------

Follow the directions in our `Kolibri i18n docs <https://kolibri-dev.readthedocs.io/en/develop/i18n.html>`__.


Release process and versioning
------------------------------

The versioning and releasing of this ``kolibri_exercise_perseus_plugin`` plugin is independent of both Kolibri and Perseus. We use semantic versioning, and create release branches for each minor release.


How to publish to PyPi?
-----------------------

When publishing, you'll need a GPG key to sign the package and associate it with your identity. You'll need to have ``gpg`` on your path. Some resources that might be helpful:

* https://help.github.com/articles/generating-a-new-gpg-key/
* https://keybase.io/
* https://www.gnupg.org/
* https://gpgtools.org/

You'll also need an account on PyPi with access to the `kolibri-exercise-perseus-plugin package <https://pypi.org/project/kolibri-exercise-perseus-plugin/>`__

Next, follow these steps carefully:

1. Follow the instructions above to installing the plugin for development.
2. Run ``pip install twine``.
3. Update the version number in ``kolibri_exercise_perseus_plugin/__init__.py``. Commit it to the perseus release branch. Tag a new release using `github's web UI <https://github.com/learningequality/kolibri-exercise-perseus-plugin/releases>`__.
4. Check out the tagged commit and ensure that you have no local changes.

5. Build the frontend assets and .whl file by running::

    make dist

6. Check that there are CSS, JS, and JSON files when searching the wheel file for ``kolibri_exercise_perseus_plugin``::

    unzip -vl dist/[GENERATED WHEEL FILE NAME] | grep exercise_perseus_render_module

7. Sign and publish to PyPi::

    make release


Known issues
------------

**Development installation version not active**

If you ran ``make dist`` or ``make pex`` on Kolibri with ``kolibri-exercise-perseus-plugin==x.x.x`` present in ``kolibri/requirements/base.txt``, Kolibri will generate an ``kolibri_exercise_perseus_plugin`` instance inside its ``kolibri/dist`` folder and bundle it for further distribution. That means manually installing ``kolibri_exercise_perseus_plugin`` for development won't take any effects. One way to fix this issue is to run ``make clean`` on Kolibri.


How can I contribute?
~~~~~~~~~~~~~~~~~~~~~

Thanks for your interest! Please see the `contributing section <https://kolibri-dev.readthedocs.io/en/develop/contributing/index.html>`__ of our `online developer documentation <http://kolibri-dev.readthedocs.io/>`__.
