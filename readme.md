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

When you slelect full set (dataset name and run rumber) you will se that regular search fields is replaced by dataset and run number browsers (highlighted red).
![Folder path](public/images/datasetAndRun.png)

If you want **to change a run number**, you could do this in two ways:

1. Select a new run number from the **dropdown list**, which is open when you click on a run number's field. Options in dropdown list depend on slected dataset name. It means that all runs in this list have **selected dataset**. ![Possible_datasets](public/images/possibleDatasets.png)
2. Use **blue arrows**. They let browsing through prev/next run numbers. If a left arrow is grey it means that the current run number is the first in the list of available run numbers, so you cannot go further. The same with a right arrow- it becomes grey when a current run number is the last in the list of available run numbers.

If you want **to change a dataset name**, you could do this in three ways:

1. Select a new dataset name from the **dropdown list**, which is open when you click on a dataset field. Options in dropdown list depend on slected run number. It means that all datasets in this list have **selected run number**.
2. Use **blue arrows**. They let browsing through prev/next dataset names. If a left arrow is grey it means that the current dataset name is the first in the list of available dataset, so you cannot go further. The same with a right arrow- it becomes grey when a current run number is the last in the list of available datasets.
3. Use **dataset builder**. Firstly, you need to change the _dataset select mode_ to _dataset builder mode_. It could be done by clicking on "Dataset Select". You will see dropdown list with two options: "Dataset Select" and "Dataset Builder". Click on "Dataset Builder". You should see a view like this:
   ![Possible_datasets](public/images/datasetBuilderOptions.png)
   With dataset builder, you can change all three parts of dataset name. Click on a part which you want to change, a dropdown list will be opened with all available options. They could be in two colors: green or red. **These colors depend on a part that is written in bold**. **Bolden part** is the last clicked part. Other parts depend on it. So, if the option is red, that means that this option does not compatible with the bolden part, but that does not mean that you cannot select it! If you select the red one, the thick (on the right) will be change to exit cross, and parts whose are not compatible with the last selected part become red.
   ![Invalid builder](public/images/invalidBuilder.png)
   It means that this dataset, which consists of selected dataset parts, is not existing (or in other words- is not valid). In order to make a request with a valid dataset name, you need to combine all three green parts.

---

## Browsing through datasets and runs using free search

When we are browsing thought datasets and runs using browsers/builder we are limited by available options. It is like this because the run browser shows all possible
runs options by the selected dataset (selected dataset name is visible on dataset name browser/builder). The same situation is with dataset names options: it is possible
to select just those which exist with a selected run.

In order to expand search possibilities, the free search is implemented. **Free search** - is the same search initial **Search**, which is not limited. In order to reach
Free search, needs to click the search button (highlighted red).

![Free_search_button](public/images/freeSearch.png)

When this button is clicked, you will see search dialog. It is divided into 3 sections:
![Free_search_dialog](public/images/freeSearchDialog.png)

1. Search fields, where you can search data by run number or dataset name (initial values are those, which already selected).
2. Selected dataset name and run number (initial values are those, which already selected).
3. Search results.

If you want to change the selected dataset and run number, enter wanted dataset name and/or run number to search fields, click the search button. In the results section, you will see all results got by the search. Select whichever you need. You will see that the second section is changed: dataset name and run number was replaced by selected ones.
![Free_search_dialog_results](public/images/datasetNameAndRun.png)

If wanted dataset and run is visible on the second section, click on button "OK" (on the right side of dialog). After this step datset and run builders will be filled with
selected run and dataset name.
selectedDatasetNameFilled
![Free_search_dialog_results_filled](public/images/selectedDatasetNameFilled.png)

---

## Worskpaces

Worskpaces selection could be found on the right side of the window. Worskpaces is folders filter by selected subsystem.
![Free_search_dialog_results_filled](public/images/workspaces.png)

If you want to change workspaces, click on blue word (in this case _"Everything"_),
![Free_search_dialog_results_filled](public/images/workspaces.png)

select wanted worskpace.
![Free_search_dialog_results_filled](public/images/workspaceDialog.png)

---

## Plots search

Plots search field could be found on the right side of the window, next to workspaces selection. If you want to find specific plot/plots, enter its full/part of the name. You will get a folder in which this plot is. Go into that folder/folders until you reach a searched plot.

For example, my current directory is "/" (it is visible in folder path on the right side, below CMS logo). In a plot search, I enter plot name which is _GoodTracksFractionVsBX_ALCARECOMuAlGlobalCosmics_. In the results, I am getting _AlCaReco_ folder.
![The_first_layer_folder_by_search](public/images/firstLayerFolder.png)

Going inside util I will reach wanted plot.
![Found_plot](public/images/foundPlot.png)

---

## Plots

On certain level of browsing subsystem you will reach plots list.
![Plots](public/images/plots.png)

1. **Changing size**

- If you want to change the size of these plots, you need to
  click on "Options" and choose from 5 available options in section _Left side size_ : _Tiny_, _Small_, _Medium_ (default), _Large_ or _Fill_.
  ![Plots](public/images/fill.png).

2. **Overlay plots**

- In options component is _Reference_ section. Here you can overlay plots. In order to do it, you need to click "+ SET RUNS". It will open a dialog, with the regular search: two search fields bu run number and dataset name (image below). Enter the data that you want and click the search button. Below you will see search results. Select whichever you want and your selected data (dataset name and run number) will be displayed in a table above search fields. Maximum 4 plots could be chosen for overlay, because of backend reasons.
  ![setting_runs_for_overlay](public/images/setRunsOverlayMenu.png).
  When all wanted runs are selected click "OK". Selected runs will be added in _Reference_ section. To overlay it, click _Submit_ button. On the left corner of a plot, you can see a small table. It is statistics of plot, which was overlaid on the current one. You can change the label of this table, just need to fill text field with placeholder _label_ before you click _Submit_ (by default label is run number).

![set_runs_for_overlay](public/images/selectedRunsForOverlay.png).

**I want to change my selected run, what should I do?**
Every selected run in _Reference_ section has _Change_ button. Click on it and it will open a dialog, where you can change selected run.
![set_runs_for_overlay_change](public/images/changeSelectedRun.png).

3. **Plots selection**
   Plot could be selected with a plus button click on the right corner of a plot. In this case, a window will be divided into two sections:

   - On the left side will be a list of all plots.
   - On the right side will be a list of selected plots.

Also, some options in _Options_ sections will be unlocked: _Right side size_ modification and _JSROOT_ mode. These options change is available when at least one plot selected because it affects just plots that are on the right side.

When plots is selected (visible on the right side of a window) and JSROOT mode is disabled, plots on the right side could be customized. Plots customization is done following these actions:

1. Hover _More_ on the right side of a plot and from drop down select _Customize_.
2. Change wnated options.
3. Click _OK_.

![plot_customization](public/images/plotCustomization.png).

If you want to change position (to horizontal or vertical) of displayed plots (when at least one plot is selected), you could click _Settings_ button, which is in the right side of a window. Then you could change _Plots View Position_ and _Plots View Proportions_. In proportions the first number represents left side of a window, the second - the right side.

![settings](public/images/settings.png).

# Online mode

Online mode is reactable via link https://cmsweb-testbed.cern.ch/dqm/online-new.

1. The main page of GUI shows a list of 100 latest runs. This list is updated every 20 seconds.
   ![latest_runs](public/images/latest_runs_list_doc.png)

2. On the right corner of the initial page you could see a green button “Live mode”.
   It leads the user to live mode, where the dataset is /Global/Online/ALL and run number 0.
   ![live_mode_button](public/images/live_mode_button.png)
3. After this move, you will be led to Summary workspace folder, where all plots, which are proccesing during current run.
   ![summary](public/images/summary.PNG)
   4.Live mode updates could be stopped by clicking the “pause” button.
   When updates are stopped the “pause” button changes to the “play” button and “LIVE MODE” is colored red.

![live_mode_on](public/images/live_mode_on.PNG)

![live_mode_off](public/images/live_mode_off.png)

5. If the user is in a live mode, every plot, which he sees is updated every 20 sec.
   Updated is indicated by plot background color change (from light blue to dark purple) and a spinner.

![loading_plot](public/images/loading_plot.PNG)

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
10. Previuos request is not canceled.

---

---

## Need to be done

1. ~~Search plot by plot name~~(05/06/2020)
2. ~~Workspaces~~(05/06/2020)
3. ~~Zoomed plots linkability~~
4. ~~Browsing by dataset name and run number~~
5. ~~Services~~
6. Downloading of ROOT files
7. ~~Display qtest results (colored plots)~~
8. Display server name
9. Integrate P5 alarm manager
10. ~~On plot selection (when screen divided to two sides), need to scroll down until selected plot (on the left side list)~~.(30/05/2020)
11. ~~Fit dataset name in select field.~~
12. ~~Change style: need to save some space~~.(22/05/2020)
13. ~~Add clickability on arrows of run number and dataset name browser fields.~~
14. ~~Data search for overlay could be done in one window for all 4 runs.~~
15. Add the most popular options explanation to customize.
16. ~~Make sure that options, which could be change on a right and left side (when at least one plot is selected), would be around the same.~~ (10/06/2020)
17. ~~Layouts~~
18. ~~Plots per Lumi~~(18/06/2020)
19. ~~Horizontal an Vertical plot display~~ (11/06/2020)
20. ~~Customization for ONE plot~~ (09/06/2020)
21. ~~Free and combined search~~ (11/06/2020)
22. ~~Display run information~~
23. ~~Plots loading indication~~
24. ~~DO SUMMARY WORKSAPCE!!!!~~
25. ~~Overlay plots -selected runs in the overlay options are not the same which are selected by search~~
26. The main Run information in live mode, must be visible in a header (live mode)
27. Shift folder is empty (why?)
28. Change workspaces according mode
29. ~~Styles file import~~
30. ~~Ovelay plots with different names, but having same runs and dataset.~~
31. There is some plots, where api returns error 500 and root adds warning (_adc_per_OnloineBlock_PXForward_)
32. When plot is not uploaded GUI doesn't try to upload it again
33. Not to make a new req, when old is not finished yet.
34. Event numbers: check pricessedEvents and iEvent
35. Notification, when is no current run (0, Global....)
36. ~~Bug: user can't delete ar run from overlay runs list~~
---
