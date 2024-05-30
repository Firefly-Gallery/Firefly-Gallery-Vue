from wand.image import Image
import os
import sys

target_exts = ("jpg", "png", "gif")
thumb_exts = ("avif", "webp")

exclude = ["Home_CardLarge.jpg"]
scan_path = "./images/"


def generate(path):
    file_name = os.path.basename(path)
    base_name = os.path.splitext(file_name)[0]
    for ext in thumb_exts:
        with open(path, "rb") as f:
            with Image(file=f) as img:
                ratio = img.size[1] / img.size[0]
                # img.resize(512, int(512 * ratio))
                img.compression_quality = 80
                file_path = f"{base_name}.{ext}"
                file_path = os.path.join(scan_path, file_path)
                if not os.path.isfile(file_path):
                    print(f"Converting {file_path}")
                    img.save(filename=file_path)


if __name__ == "__main__":
    print(sys.argv[1])
    if sys.argv[1] == "clean":
        for f in os.listdir(scan_path):
            if f.endswith(thumb_exts):
                f = os.path.join(scan_path, f)
                os.remove(f)
    if sys.argv[1] == "generate":
        for f in os.listdir(scan_path):
            if f.endswith(target_exts) and f not in exclude:
                f = os.path.join(scan_path, f)
                generate(f)
