# JerryTranslate

macOS 截图与文字翻译工具。以英文译简体中文为主，已有简体、繁体中文原样保留。

首个正式版本正在准备中。[查看 Releases](https://github.com/wupinshuo/JerryTranslate-Releases/releases)。

## 系统要求与安装

- Apple Silicon（M 系列芯片），macOS 26.0 或更高版本；不支持 Intel。
- 从 Releases 下载 `*-arm64.zip`，解压后将应用拖入 `/Applications`。
- 首次截图按系统提示授予屏幕录制权限。翻译需要 macOS 管理的英语、简体中文资源。
- `⌥⌘J` 截图翻译；`⌥⌘T` 打开文字翻译，也可从菜单栏进入。

## 更新

首个正式版手动安装。后续可在菜单栏选择“检查更新…”，或在设置中开启每日自动检查。
下载、安装由你确认；进行中的截图、翻译会暂缓更新，重启前会提醒处理文字草稿。
更新包经 Developer ID 签名、公证，并通过 Sparkle EdDSA 验证；请仅从本仓库下载。

## 隐私与反馈

OCR 与翻译在本机完成，截图和文字只在内存中处理，不上传、不保存历史。
更新功能会连接 GitHub Pages / GitHub Releases，不携带截图、原文或译文。
请通过 [Issues](https://github.com/wupinshuo/JerryTranslate-Releases/issues) 反馈，提交前移除截图中的个人信息。

本仓库只用于发布安装包、更新源和说明，不包含应用源码。
安装包上的许可说明以应用附带的许可文件为准；仓库 LICENSE 不用于推断未公开源码的授权。
