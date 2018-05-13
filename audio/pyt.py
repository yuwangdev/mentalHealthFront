import speech_recognition as sr


r = sr.Recognizer()
with sr.AudioFile("myFile.wav") as source:
   audio = r.record(source)

try:
   s = r.recognize_google(audio)
   print s
except Exception as e:
   print str(e)