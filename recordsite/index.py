import fastapi as fapi
import uvicorn, os

app = fapi.FastAPI()
realauthkey = "C62a3NSZApUG5Ur8eeNI27cNbmNaiMSE2YlnBnTz5wTZK1Y7gJblQ7410hkJpqyVVFQDZmzz0N9jDH7T1q8Ev052QC76ZAShGSVl4nc7AGsMvQBp1a2t4uXwCz4mhVX2gLJucwvQjSx6D765fOZBtIDw46t7wojHDt4pxamMAI9mTYRRcoykwsMYynhTd4oaaTrRoEEFym1i4E6bG0F4LqHUvTnNKcpgZ1AKAsJPlvRuOe2Q09WViSF8vkEUpUwTmLO5yTWMtpiCPDb5z2WzqBbe6VlUZb2dMVtVfR3g0yJkjZkiprRGvFKrMu0zmbLEByozx4Z04argiJAZGkMlUrc9PiremAtxkSIHNjD9bY0Mzs91JZCyi3iZ1qr9KHnIaFrtbdiADUNkhWBOxnoZlPHlInFSWN3IYaCUe8T4lnTVvLhcPdV42dh6ND8bdGU3IfDRR90QfDgYiJYYfQU8rH8ohUMmAFlHCtoUYFjc2Fz4N5Fzgw9oeYdKMSA9qSiF"

recorderinstances = {}
@app.post("/savereq/{recid}")
def upload(file: fapi.UploadFile, recid):
	if not recid in recorderinstances.keys():
		return 403
	file_location = f"files/{file.filename}"
	with open(file_location, "wb+") as file_object:
		file_object.write(file.file.read())
	recorderinstances[recid] = os.getcwd()+"/"+file_location

@app.get("/startrec/{authkey}/{recid}")
def startrec(authkey, recid):
	if authkey != realauthkey:
		return 403
	print(recid)
	recorderinstances[recid] = None
	while not recorderinstances[recid]:
		pass
	path = recorderinstances[recid]
	recorderinstances.pop(recid)
	return path

@app.get("/get/{recid}.webm")
def get(recid):
	return fapi.responses.FileResponse(os.getcwd()+"/files/"+recid+".webm")

@app.get("/")
def get():
	return fapi.responses.FileResponse("index.html")
@app.get("/index.html")
def get():
	return fapi.responses.FileResponse("index.html")
@app.get("/index.js")
def get():
	return fapi.responses.FileResponse("index.js")

uvicorn.run(app, port=6969)


