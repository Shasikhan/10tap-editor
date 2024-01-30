package com.tentap

import android.view.ViewGroup
import com.facebook.react.uimanager.ViewGroupManager

abstract class TenTapViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {
  abstract fun setKeyboardHeight(view: T?, value: Int)
}
