# Wireframes

## Desktop Homepage

```text
+----------------------------------------------------------------------------------+
| NAV: logo                                              Privacy | Terms           |
+----------------------------------------------------------------------------------+
| EYEBROW: Free in-browser tool for visible Gemini marks                         |
| H1: Gemini Watermark Remover Online                                            |
| SUBHEAD: Remove the visible Gemini sparkle watermark ...                       |
| TRUST: [Free] [No sign-up] [100% in browser] [No upload]                       |
|                                                                                |
| +----------------------------------+  +--------------------------------------+  |
| | Upload an image                  |  | Before / After proof                 |  |
| | [ Dropzone / file picker ]       |  | [ large comparison slider ]          |  |
| | JPG PNG WebP up to 10MB          |  |                                      |  |
| | Your image never leaves browser  |  |                                      |  |
| | [Try an example]                 |  |                                      |  |
| +----------------------------------+  +--------------------------------------+  |
+----------------------------------------------------------------------------------+
| EXAMPLE GALLERY: [demo 1] [demo 2] [demo 3]                                    |
+----------------------------------------------------------------------------------+
| HOW IT WORKS: [1 Upload] [2 Remove in browser] [3 Download]                    |
+----------------------------------------------------------------------------------+
| WORKS BEST FOR                  | KNOW THE LIMITS                              |
| - visible sparkle marks         | - large overlays                             |
| - small corner logos/icons      | - faces / dense texture                      |
| - simple visible marks          | - SynthID / invisible / provenance          |
+----------------------------------------------------------------------------------+
| FAQ accordion                                                                    |
+----------------------------------------------------------------------------------+
| MANUAL RETRY HELP                                                                  |
+----------------------------------------------------------------------------------+
| PRIVACY + RESPONSIBLE USE + TRADEMARK DISCLAIMER                                 |
+----------------------------------------------------------------------------------+
| FOOTER                                                                           |
+----------------------------------------------------------------------------------+
```

## Mobile Homepage

```text
+--------------------------------------+
| NAV                                  |
+--------------------------------------+
| EYEBROW                              |
| H1                                   |
| SUBHEAD                              |
| [Free] [No sign-up]                  |
| [100% in browser] [No upload]        |
+--------------------------------------+
| Upload card                          |
| [ file picker ]                      |
| JPG PNG WebP up to 10MB              |
| Try an example                       |
+--------------------------------------+
| Comparison slider                    |
+--------------------------------------+
| Demo cards                           |
+--------------------------------------+
| 3-step how it works                  |
+--------------------------------------+
| Works best for                       |
+--------------------------------------+
| Limits                               |
+--------------------------------------+
| FAQ                                  |
+--------------------------------------+
| Manual retry help                    |
+--------------------------------------+
| Privacy + disclaimer                 |
+--------------------------------------+
```

## Processing State

```text
+------------------------------------------------------+
| Detecting and removing the visible mark...           |
| [progress indicator]                                 |
| If the mark is missed, you can select it manually.   |
+------------------------------------------------------+
```

## Manual Selection State

```text
+------------------------------------------------------+
| Select the visible watermark area                    |
| Drag a small box around the sparkle mark, then       |
| run the cleanup again in your browser.               |
|                                                      |
| [Apply cleanup]   [Retry auto-detect]                |
+------------------------------------------------------+
```

## Result State

```text
+------------------------------------------------------+
| Your cleaned image is ready                          |
| [comparison slider]                                  |
| [Download clean image] [Try another image]           |
| Rate the result: [Looks good] [Needs improvement]    |
+------------------------------------------------------+
```
