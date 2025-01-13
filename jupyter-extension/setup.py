from setuptools import setup, find_packages

setup(
    name='jupyter_ai_chat',
    version='0.1',
    description='Jupyter extension for AI Chat integration',
    author='Your Name',
    author_email='your.email@example.com',
    packages=find_packages(),
    include_package_data=True,
    package_data={
        'jupyter_ai_chat': ['static/*'],
    },
    data_files=[
        ('etc/jupyter/nbconfig/notebook.d', ['jupyter_ai_chat.json']),
    ],
    install_requires=[
        'notebook>=5.0.0',
    ],
)