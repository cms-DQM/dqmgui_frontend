# How to use DGM GUI?

# https://dqm-gui.web.cern.ch/

## Search

In order to search for plots, first of all, you need to determine which run/dataset you want to look at. After that do a search by it.

1. In the new DQM GUI search could be done in 3 ways:

- By dataset name (full or part of it).
- By run (full or part of it).
- Or by both.

2. If data entered in the search is valid (dataset name or/and run exists), you will get a table with listed dataset names, which match your search. It means, if you searched by:

- Dataset name, you will see that all rows in a table are filled with that name.
- Run, you will see that all rows in the table are filled with dataset names, which searched run has.

3. If you click on a row, which represents a dataset name, a row will be expanded and there you will see a list with runs, whose have this dataset.
   ![](public/images/selectedDatasetName.png)

4) Click on the wanted run number.
   Now all data which you need to do a search for plots is selected: **dataset name** and **run number**.

---

## Browsing through subsystems

When full set is selected (dataset name and run number) you will see a list of **directories**.
![Directories list](public/images/subsystems.png)
Every **directory** represents a specific subsystem. Click on whichever you want. Then a list of inner directories (folders) or plots will be shown.

On the left side you can see a navigation (highlighted in red), which represents directories path. The last item in it is your **current directory**. If you want to get back to another directory (which is listed in navigation), you need just to select and your current directory will be changed to selected one.

![Folder path](public/images/folderPath.png)

---

## Browsing through datasets and runs

On the top left corner, there are two fields whose indicate selected dataset name and run number (highlighted red).
![Folder path](public/images/datasetAndRun.png)

If you want **to change a run number**, you could do this in two ways:

1. Select a new run number from the **dropdown list**, which is open when you click on a run number's field. Options in dropdown list depend on slected dataset name. It means that all runs in this list have **selected dataset**.
2. Use **blue arrows**. They let browsing through prev/next run numbers. If a left arrow is grey it means that the current run number is the first in the list of available run numbers, so you cannot go further. The same with a right arrow- it becomes grey when a current run number is the last in the list of available run numbers.

If you want **to change a dataset name**, you could do this in three ways:

1. Select a new dataset name from the **dropdown list**, which is open when you click on a dataset field. Options in dropdown list depend on slected run number. It means that all datasets in this list have **selected run number**.
2. Use **blue arrows**. They let browsing through prev/next dataset names. If a left arrow is grey it means that the current dataset name is the first in the list of available dataset, so you cannot go further. The same with a right arrow- it becomes grey when a current run number is the last in the list of available datasets.
3. Use **dataset builder**. Firstly, you need to change the _dataset select mode_ to _dataset builder mode_. It could be done by clicking on "Dataset Select". You will see dropdown list with two options: "Dataset Select" and "Dataset Builder". Click on "Dataset Builder". You should see a view like this:
   ![Folder path](public/images/datasetBuilder.png)
   With dataset builder, you can change all three parts of dataset name. Click on a part which you want to change, a dropdown list will be opened with all available options. They could be in two colors: green or red. **These colors depend on a part that is written in bold**. **Bolden part** is the last clicked part. Other parts depend on it. So, if the option is red, that means that this option does not compatible with the bolden part, but that does not mean that you cannot select it! If you select the red one, the thick (on the right) will be change to exit cross, and parts whose are not compatible with the last selected part become red.
   ![Invalid builder](public/images/invalidBuilder.png)
   It means that this dataset, which consists of selected dataset parts, is not existing (or in other words- is not valid). In order to make a request with a valid dataset name, you need to combine all three green parts.

---

## Plots

On certain level of browsing subsystem you will reach plots list.
![Plots](public/images/plots.png)

1. **Changing size**

- If you want to change the size of these plots, you need to
  click on "Display Options" and choose from 5 available options: _Tiny_, _Small_, _Medium_ (default), _Large_ or _Fill_.
  ![Plots](public/images/fill.png)

2. **Overlay plots**

- In order to overlay plots, you need to click "Overlay options". There you will see a line with _run_number_ and _dataset_name_ (by default they are the same as current selected). This line reperesents plots' data whose will be overlaid with current visible plots. For example, my current select data:

  - dataset name: /Cosmics/Commissioning2018-PromptReco-v1/DQMIO
  - run number: 308333

  I want to overlay visible plots with:

  - dataset name: : /HLTPhysics/Commissioning2018-PromptReco-v1/DQMIO
  - run number: 308335

  What should I do?
  Firstly, need click on "Change" button, it will open a dialog with two search fields. They work on the same principle as previuos discussed search (in a header). Find a dataset name which you need and select wanted run number.
  ![Plots](public/images/overlaySearch.png)
  After this, click "Submit" and plots will be overlaid.
  ![Plots](public/images/overlaidPlotsList.png)
  In the left corner of a plot, you can see a small table. It is statistics of plot, which was overlaid on the current one. You can change the label of this table, just need to fill text field with placeholder _label_ before you click _Submit_.  
   If you want to overlay one more time just with different data, you should click plus button and it will add one more row with _run_number_ and _dataset_name_. The maximum amount of these lines is 4, because of backend reasons.

3. **Plots selection**
   Plot could be selected with a plus button click on the right corner of a plot. In this case, a window will be divided into two sections:

   - On the left side will be a list of all plots.
   - On the right side will be a list of selected plots.

   1. The format of **selected plots** could be changed to JSROOT format. In order to do it, you need to click _Display options_ (on the right side) and click on the switch button with note JSROOT disabled (highlighted red).
      ![JSROOT mode](public/images/JSROOTMode.png)
   2. If JSROOT mode is disabled, **selected plots** can be customized. In order to do it you need to click _Customize_, change parameters you want and click _Submit_. **All selected plots** will be customized by these parameters.

---

# Known bugs list

1. ~~**Zoomed plot not visible when the window is scrolled down.**~~

~~- It happens when users get a list of plots and select at least one of them. After that, the window is separated on two sides. Users scroll down to see the end of a folder, **the selected plot goes out of view**.~~

2. **Zoomed plots in JSROOT mode is crashed.**

- When users select a plot, turns on JROOT mode and select another plot (by clicking on the plot) JSROOT, **is visible just blank square or two plots (currently selected and the previous select) are overlaid.**

3. ~~**Error messages are not displayed when errors occur, e.g. server-side or authorization problems.**~~

4. ~~**Request is not canceled when it takes too long**~~

5. ~~**Searching data for overlay plot data is not found**.~~

~~- When the search is done by dataset name results are not found, even then they exist.~~

6. ~~Plots are not sorted by an alphabet.~~

7. **Customization of a plot should work with auto-submit.**

8. ~~**When plots are overlaid on side, them have to be display in a row, not in column**~~

9. ~~Overlay _overlay_ and _stack_ looks the same (?)~~

---

---

## Need to be done

1. ~~Search plot by plot name~~(05/06/2020)
2. ~~Workspaces~~(05/06/2020)
3. ~~Zoomed plots linkability~~
4. ~~Browsing by dataset name and run number~~
5. Services
6. Downloading of ROOT files
7. Display qtest results (colored plots)
8. Display server name
9. Integrate P5 alarm manager
10. ~~On plot selection (when screen divided to two sides), need to scroll down until selected plot (on the left side list)~~.(30/05/2020)
11. ~~Fit dataset name in select field.~~
12. ~~Change style: need to save some space~~.(22/05/2020)
13. ~~Add clickability on arrows of run number and dataset name browser fields.~~
14. Data search for overlay could be done in one window for all 4 runs.
15. Add the most popular options explanation to customize.
16.  ~~Make sure that options, which could be change on a right and left side (when at least one plot is selected), would be around the same.~~~ (10/06/2020)
17. Layouts
18. Plots per Lumi
19. ~~Horizontal an Vertical plot display~~ (11/06/2020)
20. ~~Customization for ONE plot~~ (09/06/2020)
21. ~~Free and combined search~~ (11/06/2020)

---
