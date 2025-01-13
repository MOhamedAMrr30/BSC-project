from setuptools import setup

setup(
    name="jupyter_debug_extension",
    version="0.1.0",
    packages=["jupyter_debug_extension"],
    data_files=[
        ("share/jupyter/nbextensions/debug_panel", [
            "jupyter_debug_extension/static/index.js"
        ]),
        ("etc/jupyter/nbconfig/notebook.d", [
            "jupyter_debug_extension.json"
        ])
    ],
    install_requires=[
        "notebook>=5.0.0"
    ]
) 