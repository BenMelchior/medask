<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
</script>

<div id="app-container">
	<header id="app-header">
		<div class="container">
			<div class="logo">MedAsk.</div>
			<nav>
				<ul>
					<li><a href="/ask">Ask!</a></li>
					<li><a href="/impressum">Contact</a></li>
				</ul>
			</nav>
		</div>
	</header>

	<main id="app-content">
		<div class="container">
			<slot />
		</div>
	</main>

	<footer id="app-footer">
		<div class="container">
			<div class="copyright">MedAsk © 2023</div>
			<div class="links">
				<ul>
					<li><a href="/impressum">Impressum</a></li>
				</ul>
			</div>
		</div>
	</footer>
</div>
