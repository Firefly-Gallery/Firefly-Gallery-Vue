# Firefly Gallery
![Static Badge](https://img.shields.io/badge/5.2.2-21af90?style=flat&logo=vite&logoColor=8976fe&label=Vite&color=8976fe)
![Static Badge](https://img.shields.io/badge/3.4.21-21af90?style=flat&logo=Vue.js&logoColor=42d392&label=Vue&color=42d392)
![Static Badge](https://img.shields.io/badge/20.11.1-21af90?style=flat&logo=Node.js&logoColor=68ca5a&label=Node.js&color=68ca5a)
![Static Badge](https://img.shields.io/badge/10.2.5-21af90?style=flat&logo=npm&logoColor=c90000&label=npm&color=c90000)

## Requirements
- Python3 (recommended version: Python >= 3.10)
- [ImageMagick](https://imagemagick.org/index.php) installed and could be accessed globally
- Jetbrains Webstorm (so the build configs in /.run/ could be read)
  - You could also use [VS Code](https://code.visualstudio.com/) + 
    [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + 
    [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin). However, you may need to configure the build by yourself
- Node.js and npm (recommended version: node == 20.11.1 npm == 10.2.5)

## Setup

- Install Dependencies:
    ``` bash
    npm i
    ```
- or for Chinese region:
    ```bash
    npm i cnpm -g
    cnpm i
    ```

- run development server:
    ```bash
    npm run dev
    ```

## Build
Building Configurations are written in /.run/ using Jetbrains Webstorm

If you are using other IDEs, here are the full building process:

1. Run convert.py in `/src/assets` with parameter `generate` to generate extra image formats
    (`avif` and `webp` by default, referring to the API of 
    [Image](https://github.com/Firefly-Gallery/Firefly-Gallery-Vue/tree/main/src/components/UI/Image.vue) component):
    ```bash
    cd ./src/assets
    # install dependency
    pip install wand
    # run
    python convert.py generate
    ```
2. Run the build command:
    ```bash
    npm run build
   ```

The new images generated under `/src/assets` are redundant in developing stage,
which could be deleted using `./src/assets/convert.py` with parameter `clean`:
```bash
cd ./src/assets
python convert.py clean
```

## Referenced Repositories
- [sr-message-maker](https://github.com/blacktunes/sr-message-maker) By [blacktunes](https://github.com/blacktunes)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js) By [eligrey](https://github.com/eligrey)
- [vue-next-masonry](https://github.com/DaPotatoMan/vue-next-masonry) By [DaPotatoMan](https://github.com/DaPotatoMan)
- [aplayer](https://github.com/DIYgod/APlayer) By [DIYgod](https://github.com/DIYgod)
- [vue-pinch-scroll-zoom](https://github.com/coddicat/vue-pinch-scroll-zoom/tree/main) By [coddicat](https://github.com/coddicat)
