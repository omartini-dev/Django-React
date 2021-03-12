from io import BytesIO
import subprocess


def strip_metadata(fp):  # fp is a Django UploadedFile
	args = ['exiftool', '-All=', '-']
	p = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
	out, err = p.communicate(input=fp.read())
	return BytesIO(out)