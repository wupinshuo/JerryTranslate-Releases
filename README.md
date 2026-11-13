# JerryTranslate

macOS 截图与文字翻译工具。本地模式以英文译简体中文为主，已有简体、繁体中文原样保留；在设置中启用在线翻译后，可在文字窗口切换翻译方式，默认关闭。

## [⬇️ 下载安装](https://wupinshuo.github.io/JerryTranslate-Releases/)

打开[官方下载页](https://wupinshuo.github.io/JerryTranslate-Releases/)，点击“下载安装”即可获取 Apple Silicon 安装包。你也可以直接分享这个页面。

[查看版本发布与更新说明](https://github.com/wupinshuo/JerryTranslate-Releases/releases)。GitHub 自动生成的 `Source code` 是发布仓库快照，不是应用安装包。

## 系统要求与安装

- Apple Silicon（M 系列芯片），macOS 26.0 或更高版本；不支持 Intel。
- 下载 `JerryTranslate-…-arm64.zip`，解压后将 `JerryTranslate.app` 拖入“应用程序”（`/Applications`），双击启动。
- 首次截图按系统提示授予屏幕录制权限。本地翻译需要 macOS 管理的英语、简体中文资源；在线模式无需下载这些资源，但需向开发者索取密钥并在设置中保存一次；保存后不再显示密钥内容。
- `⌥⌘J` 截图翻译；`⌥⌘T` 打开文字翻译，也可从菜单栏进入，快捷键可在设置中修改。

## 更新

首个正式版手动安装。后续可在菜单栏选择“检查更新…”，或在设置中开启每日自动检查。
下载、安装由你确认；进行中的截图、翻译会暂缓更新，重启前会提醒处理文字草稿。
更新包经 Developer ID 签名、公证，并通过 Sparkle EdDSA 验证；请仅从本仓库下载。

下载页自动读取 GitHub 的最新正式版，并只选择 `JerryTranslate-<版本>-arm64.zip` 安装包。接口暂时不可用时，仍提供页面内置的已发布版本下载链接。

## 隐私与反馈

OCR 与本地翻译在设备上完成，不保存翻译历史。在线翻译默认关闭；启用并在文字窗口选择在线翻译后，提交的完整原文会发送至在线翻译服务。
更新功能会连接 GitHub Pages / GitHub Releases，不携带截图、原文或译文。
请通过 [Issues](https://github.com/wupinshuo/JerryTranslate-Releases/issues) 或 [jerrywu0713@gmail.com](mailto:jerrywu0713@gmail.com) 反馈，提交前移除截图中的个人信息。

本仓库只用于发布安装包、更新源和说明，不包含应用源码。
安装包上的许可说明以应用附带的许可文件为准；仓库 LICENSE 不用于推断未公开源码的授权。
