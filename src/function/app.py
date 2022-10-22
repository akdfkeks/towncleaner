import sys
import random

def predict(path):
	# 이미지 임포트 및 result 에 결과 넣기
	# 얘는 임시로 25개
	result = random.randint(0,24)
	print(result, end='')
	sys.stdout.flush()
	
if __name__ == '__main__':
	predict(sys.argv[1])