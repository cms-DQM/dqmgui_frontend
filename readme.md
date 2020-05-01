# New DQM GUI

---

## Known bugs list

1. **Zoomed plot not visible when the window is scrolled down.**

- It happens when users get a list of plots and select at least one of them. After that, the window is separated on two sides. Users scroll down to see the end of a folder, **the selected plot goes out of view**.

2. **Zoomed plots in JSROOT mode is crashed.**

- When users select a plot, turns on JROOT mode and select another plot (by clicking on the plot) JSROOT, **is visible just blank square or two plots (currently selected and the previous select) are overlaid.**

3. **Error messages are not displayed when errors occur, e.g. server-side or authorization problems.**

4. **Request is not canceled when it takes too long**

5. **Searching data for overlay plot data is not found**.

- When the search is done by dataset name results are not found, even then they exist.

6. **Plots are not sorted by an alphabet.**

7. **Customization of a plot should work with auto-submit.**

8. **When plots are overlaid on side, them have to be display in a row, not in column**

---

---

## Need to be done

1. Search plot by plot name
2. Workspaces
3. Zoomed plots linkability
4. Browsing by dataset name and run number
5. Services
6. Downloading of ROOT files
7. Display qtest results (colored plots)
8. Display server name
9. Integrate P5 alarm manager
10. On plot selection (when screen divided to two sides), need to scroll down until selected plot (on the left side list).
11. Fit dataset name in select field.

---
