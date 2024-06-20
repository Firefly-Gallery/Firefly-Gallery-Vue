import base64
import hashlib
import os
import sys
from itertools import islice

import oss2
from dotenv import load_dotenv, set_key
from pathlib import Path

env_file_path = Path(".env")

if not os.path.exists(env_file_path):
    os.makedirs(env_file_path, exist_ok=True)

load_dotenv(env_file_path)


# get system environment with error quit
def GetSysEnv(name, fail_exit=True):
    value = os.getenv(name)
    if not value:
        if fail_exit:
            print(f"ERROR: Environment variable {name} is not detected!")
            val = input("Please enter the variable's value: ")
            if not val or val == "":
                sys.exit(2)

            SetSysEnv(name, val)
            return val
        return None
    return value


def SetSysEnv(name, value):
    set_key(dotenv_path=env_file_path, key_to_set=name, value_to_set=value)


access_key_id = GetSysEnv('OSS_TEST_ACCESS_KEY_ID')
access_key_secret = GetSysEnv('OSS_TEST_ACCESS_KEY_SECRET')
bucket_name = GetSysEnv('OSS_DATA_BUCKET')
endpoint = GetSysEnv('OSS_TEST_ENDPOINT')

print("========Start OSS Secrets========")
print("access key id: " + access_key_id)
print("access key secret: " + access_key_secret)
print("bucket name: " + bucket_name)
print("endpoint: " + endpoint)
print("=========End OSS Secrets=========")

bucket_domain = f"https://{bucket_name}.{endpoint}/"

# 创建Bucket对象，所有Object相关的接口都可以通过Bucket对象来进行
bucket = oss2.Bucket(oss2.Auth(access_key_id, access_key_secret), endpoint, bucket_name)

def calculate_file_md5(file_name, block_size=64 * 1024):
    """计算文件的MD5
    :param file_name: 文件名
    :param block_size: 计算MD5的数据块大小，默认64KB
    :return 文件内容的MD5值
    """
    with open(file_name, 'rb') as f:
        md5 = hashlib.md5()
        while True:
            data = f.read(block_size)
            if not data:
                break
            md5.update(data)
    return base64.b64encode(md5.digest()).decode('utf-8')


def delete_all_files():
    for f in oss2.ObjectIterator(bucket):
        print(f"Deleting {f.key}")
        bucket.delete_object(f.key)


def upload_file(file_path, upload_path, override=False):
    upload_path = upload_path.replace("\\", "/")
    try:
        obj_meta = bucket.get_object_meta(upload_path)
        print("File Already Exists")
        if not override: return obj_meta
        bucket.delete_object(upload_path)
    except oss2.exceptions.NoSuchKey:
        pass
    except Exception as e:
        print(f"Unknown Error: {e}")

    try:
        encode_md5 = calculate_file_md5(file_path)
        with open(file_path, 'rb') as f:
            result = bucket.put_object(upload_path, f, headers={'Content-MD5': encode_md5})
            return result
    except Exception as e:
        print(f"Error Uploading {upload_path}: {e}")


if __name__ == '__main__':
    upload_files = []
    print("Deleting previous version...")
    delete_all_files()
    print("Uploading...")
    for root, dirs, files in os.walk("dist"):
        for file in files:
            path = os.path.join(root, file)
            upload_path = path.replace("dist\\", "").replace("\\", "/")
            upload_files.append([path, upload_path])

    total = len(upload_files)
    for i, file in enumerate(upload_files):
        print(f'[{i+1}/{total}] Uploading {file[1]}...')
        upload_file(file[0], file[1], True)
