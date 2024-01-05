#include <emscripten.h>
#include <iostream>
extern "C" {
EMSCRIPTEN_KEEPALIVE
void alter(long int arr[], int num, int length) {
  for (int i = 0; i < length; i++) {
    arr[i] = arr[i] * num;
  }
}
}