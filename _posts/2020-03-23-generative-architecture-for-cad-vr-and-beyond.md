---
title: "Generative Architecture for CAD, VR and Beyond..."
---

<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generative Architecture for CAD, VR and Beyond</title>
  <link rel="stylesheet" href="https://stackedit.io/style.css" />
</head>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="generative-architecture-for-cad-and-beyond...">Generative Architecture for CAD, VR and Beyond…</h1>
<h2 id="motivation">Motivation</h2>
<p><em>“Only by having clear and vital images of the many alternatives, good and bad, of where one can go, will we have any control over the way we may actually get there in a reality tomorrow will bring all too quickly.” – Samuel Delany</em></p>
<p><em>“I learned to see freedom as always and intimately linked to the issue of transforming space” --bell hooks</em></p>
<p>This project is the beginning of a speculative exploration into experimental and possibly impossible forms of architecture and space creation. We will use Python to create generative models that we can then turn into CAD for 3-D printing and HTML for WebVR.</p>
<h2 id="no-stop-city">No-Stop City</h2>
<p><img src="https://external-content.duckduckgo.com/iu/?u=https://i.pinimg.com/originals/a1/79/e7/a179e7ec7bbe5463209cdcda92255180.jpg&amp;f=1&amp;nofb=1" alt="Example No-Stop City"></p>
<p>I wanted to start by recreating a base case, in this case Archizoom Associati's No-Stop City of 1966-72. No-Stop City consists of plans and drawings of grids of air-conditioned megastructures that repeat endlessly across the world, crossing across mountains and oceans.</p>
<p>"The metropolis ceases to be a 'place,' to become a 'condition'" (Varnelis, 87).</p>
<p><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.pamono.com%2Fl%2Fz%2F2016%2F09%2F0000058458-1200x0981%2Fno-stop-city-model-by-archizoom-1969.jpg&amp;f=1&amp;nofb=1=250px" alt="Archizoom No-Stop City"></p>
<p>No-Stop City takes the logic of maximum quantity of 1970s neoliberalist economics and takes it to its most logical extreme. "Instead of denying this logic, we decided to make use of its inner working to achieve a demystification of all its ideals" (Varnelis, 87). By co-opting the logic of superstructures (supermarkets, factory complexes, high-rises, etc.), No-Stop City provides an experiment to study its properties. Paradoxically, this model actually describes a system where the individual can achieve psychomoter freedom. Since No-Stop City extends forever the concepts of city and architecture collapse. If everything is a city nothing can be a city.</p>
<p>Why choose a radical practice from the past for our experiment? The aim is to take a closer look at models from the past and see how it can inform responses to contemporary challenges. </p>
<p>To this end we will first create a Python script that will give us a model describing our own No-Stop City. This model can then be converted into different output formats. This way we can instantiate the model in different formats without having to rewrite our underlying logic.</p>
<p><img src="https://augustocorvalan.github.io/projects/images/no-stop-ScadDiagram.png" alt="enter image description here"></p>
<p>Full code sample for this project can be found on <a href="https://repl.it/@deadalive/simplearchitecturegenerator">Repl.it</a>.</p>
<p>A sandbox of the WebVR portion of this project can be found on <a href="https://celestial-majestic-shadow.glitch.me/">Glitch</a>.</p>
<h2 id="first-model">First Model</h2>
<p>Our first model will be very simple. It represents a uniform grid of arbitrary size that contains one type of structure (“structure-1” will serve as our placeholder for now). Each structure will also contain a rotation vector with a random rotation, either 0 or 90 degrees.</p>
<pre class=" language-python"><code class="prism  language-python"><span class="token keyword">import</span> random
<span class="token keyword">import</span> json
<span class="token comment"># instantiate model</span>
model <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token string">"metadata"</span><span class="token punctuation">:</span>  <span class="token punctuation">{</span>
	<span class="token string">"name"</span><span class="token punctuation">:</span>  <span class="token string">"noise_grid_architecture_generator"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># populate grid</span>
GRID_HEIGHT <span class="token operator">=</span> <span class="token number">5</span>
GRID_WIDTH <span class="token operator">=</span> <span class="token number">5</span>
grid <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> col <span class="token keyword">in</span>  <span class="token builtin">range</span><span class="token punctuation">(</span>GRID_HEIGHT<span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">for</span> row <span class="token keyword">in</span>  <span class="token builtin">range</span><span class="token punctuation">(</span>GRID_WIDTH<span class="token punctuation">)</span><span class="token punctuation">:</span>
		cell <span class="token operator">=</span> <span class="token punctuation">{</span>
			<span class="token string">"type"</span><span class="token punctuation">:</span> <span class="token string">"structure1"</span><span class="token punctuation">,</span>
			<span class="token string">"coords"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>row<span class="token punctuation">,</span> col<span class="token punctuation">]</span><span class="token punctuation">,</span>
			<span class="token string">"rotation"</span><span class="token punctuation">:</span>  <span class="token punctuation">[</span>random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">90</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">90</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
		<span class="token punctuation">}</span>
		grid<span class="token punctuation">.</span>append<span class="token punctuation">(</span>cell<span class="token punctuation">)</span>
		 
<span class="token comment"># output to file</span>
model<span class="token punctuation">[</span><span class="token string">"grid"</span><span class="token punctuation">]</span> <span class="token operator">=</span> grid
f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>model<span class="token punctuation">[</span><span class="token string">"metadata"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">]</span><span class="token operator">+</span><span class="token string">".json"</span><span class="token punctuation">,</span>  <span class="token string">"w"</span><span class="token punctuation">)</span>
f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>model<span class="token punctuation">)</span><span class="token punctuation">)</span>
f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>
<p>Now we have our model with a grid and we’ve outputted it to JSON so it can be consumed by our Converters.</p>
<h2 id="our-first-converter">Our First Converter</h2>
<p>The first thing I would like to do is export my model to OpenSCAD which is my preferred tool for 3-D printing. OpenSCAD uses SCAD language to describe geometries so I will create a converter to take our JSON model and turn it into something OpenSCAD can understand.</p>
<p>First let’s import our model:</p>
<pre class=" language-python"><code class="prism  language-python"><span class="token keyword">import</span> json

<span class="token keyword">def</span> <span class="token function">load_model</span><span class="token punctuation">(</span>model_name<span class="token punctuation">)</span><span class="token punctuation">:</span>
	f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>model_name<span class="token punctuation">,</span><span class="token string">"r"</span><span class="token punctuation">)</span>
	model <span class="token operator">=</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> model

MODEL_NAME <span class="token operator">=</span> <span class="token string">"noise_architecture_generator.json"</span>
model <span class="token operator">=</span> load_model<span class="token punctuation">(</span>MODEL_NAME<span class="token punctuation">)</span>
</code></pre>
<p>Next let’s define a dictionary that will map our structure type to what we want OpenSCAD to show. This is trivial for this example since we only have one structure (“structure1”). In No-Stop City we see a series of rectangles laid out in a grid so we’ll map our structure to the OpenSCAD <code>cube</code> function.</p>
<pre class=" language-python"><code class="prism  language-python"><span class="token comment"># define the dimensions of the rectangle  </span>
STRUCT_HEIGHT <span class="token operator">=</span> <span class="token number">2</span>
STRUCT_WIDTH <span class="token operator">=</span> <span class="token number">6</span>
STRUCT_DEPTH <span class="token operator">=</span> <span class="token number">2</span>
<span class="token keyword">def</span> <span class="token function">structure1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">return</span>  <span class="token string">'cube([{0},{1},{2}]);'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>STRUCT_HEIGHT<span class="token punctuation">,</span> STRUCT_WIDTH<span class="token punctuation">,</span> STRUCT_DEPTH<span class="token punctuation">)</span>

struct_map <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token string">'structure1'</span><span class="token punctuation">:</span> structure1
<span class="token punctuation">}</span>
</code></pre>
<p>Now that we have our map let’s go ahead and print out each cell of the grid. We’ll define our cell size and loop through our model’s grid to populate it with structures.</p>
<pre class=" language-python"><code class="prism  language-python"><span class="token comment"># define our cell dimensions</span>
CELL_WIDTH <span class="token operator">=</span> <span class="token number">10</span>
CELL_HEIGHT <span class="token operator">=</span> <span class="token number">10</span>
<span class="token comment"># the translate function allows us to position our structs in a grid</span>
<span class="token keyword">def</span> <span class="token function">translate</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	cell_x <span class="token operator">=</span> CELL_WIDTH <span class="token operator">*</span> x	
	cell_y <span class="token operator">=</span> CELL_HEIGHT <span class="token operator">*</span> y
	<span class="token keyword">return</span>  <span class="token string">'translate([{0}, {1}])'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>cell_x<span class="token punctuation">,</span> cell_y<span class="token punctuation">)</span>

<span class="token comment"># construct our final output string that will be consumed by OpenSCAD</span>
output <span class="token operator">=</span> <span class="token string">''</span>
<span class="token keyword">for</span> cell <span class="token keyword">in</span> model<span class="token punctuation">[</span><span class="token string">'grid'</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
	struct_fn <span class="token operator">=</span> struct_map<span class="token punctuation">[</span>cell<span class="token punctuation">[</span><span class="token string">'type'</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
	coords <span class="token operator">=</span> cell<span class="token punctuation">[</span><span class="token string">'coords'</span><span class="token punctuation">]</span>
	translation <span class="token operator">=</span> translate<span class="token punctuation">(</span>coords<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> coords<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	struct <span class="token operator">=</span> struct_fn<span class="token punctuation">(</span><span class="token punctuation">)</span>
	output <span class="token operator">+=</span> translation <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> struct
<span class="token keyword">print</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span>
</code></pre>
<p>If we copy our output in OpenSCAD we should see our grid:</p>
<p><img src="https://augustocorvalan.github.io/projects/images/no-stop-scad-grid.png" alt="SCAD Cube"></p>
<p>Notice that all of our structures have the same rotation. We haven’t coded that up yet. Let’s add a rotation function and modify our output to use it.</p>
<pre class=" language-python"><code class="prism  language-python"><span class="token keyword">def</span> <span class="token function">rotate</span><span class="token punctuation">(</span>rotation_coords<span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">=</span> rotation_coords
	<span class="token keyword">return</span>  <span class="token string">'rotate([{0},{1}])'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
	<span class="token keyword">def</span> <span class="token function">generate_output</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

<span class="token keyword">def</span> <span class="token function">generate_output</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	output <span class="token operator">=</span> <span class="token string">''</span>
	<span class="token keyword">for</span> cell <span class="token keyword">in</span> model<span class="token punctuation">[</span><span class="token string">'grid'</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
		rotation_coords <span class="token operator">=</span> cell<span class="token punctuation">[</span><span class="token string">'rotation'</span><span class="token punctuation">]</span>
		rotation <span class="token operator">=</span> rotate<span class="token punctuation">(</span>rotation_coords<span class="token punctuation">)</span>
		coords <span class="token operator">=</span> cell<span class="token punctuation">[</span><span class="token string">'coords'</span><span class="token punctuation">]</span>
		translation <span class="token operator">=</span> translate<span class="token punctuation">(</span>coords<span class="token punctuation">)</span>
		struct_fn <span class="token operator">=</span> struct_map<span class="token punctuation">[</span>cell<span class="token punctuation">[</span><span class="token string">'type'</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
		struct <span class="token operator">=</span> struct_fn<span class="token punctuation">(</span><span class="token punctuation">)</span>
		output <span class="token operator">+=</span> <span class="token string">'{0} {1} {2};'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>translation<span class="token punctuation">,</span> rotation<span class="token punctuation">,</span> struct<span class="token punctuation">)</span>
	<span class="token keyword">return</span> output
</code></pre>
<p><img src="https://augustocorvalan.github.io/projects/images/no-stop-scad.png" alt="SCAD cube grid"></p>
<h2 id="more-converters">More Converters!</h2>
<p>Now that we have a simple CAD file of our version of No-Stop City it’s time to print it! But I don’t have my 3-D printer on hand and I need to buy new filaments. But I’d still like to experience this scene in 3-D, something like virtual reality where I can walk around the architecture. Thankfully Mozilla’s A-Frame framework allows us to write WebVR using HTML tags and transformations that are not so far off from SCAD. So let’s write a new converter!</p>
<p><img src="https://augustocorvalan.github.io/projects/images/no-stop-WebVRDiagram.png" alt="Updated system diagram"></p>
<p>This converter will function just like our SCAD converter, taking in our model as input and outputting a series of A-Frame HTML tags to describe it.</p>
<p>Notice that only the <code>generate_output</code> function needs to change–we could abstract away the shared logic into a Converter class to make it easier to reuse.</p>
<p>If we take our output and plop it into an A-Frame scene we can now move around our 3-D space!</p>
<p><img src="https://augustocorvalan.github.io/projects/images/no-stop-vr.gif" alt="WebVR No-Stop City"></p>
<h2 id="next-steps">Next Steps</h2>
<ul>
<li>More generators! (our simple noise generator one is nice, but what about different types of noise? What does a cellular automata generator look like?)</li>
<li>More converters! (what would our city look like plotted by a pen plotter?)</li>
<li>More structures!</li>
</ul>
</div>
</body>

</html>
