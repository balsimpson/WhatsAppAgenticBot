<template>
	<div class="flex flex-col items-center w-full max-w-4xl p-3 mx-auto">
		<div
			class="grid w-full max-w-2xl grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6"
		>
			<div class="col-span-full">
				<label
					for="name"
					class="block text-sm font-medium leading-6 text-gray-900"
					>Name</label
				>
				<div class="mt-2">
					<div
						class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-600"
					>
						<input
							type="text"
							name="name"
							id="name"
							class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md"
							placeholder="janesmith"
						/>
					</div>
				</div>
			</div>

			<div class="col-span-full">
				<label
					for="about"
					class="block text-sm font-medium leading-6 text-gray-900"
					>Instructions</label
				>
				<div class="mt-2">
					<textarea
						id="about"
						name="about"
						rows="3"
						placeholder="You are a helpful assistant."
						class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6"
					></textarea>
				</div>
			</div>

			<!-- a selection of dropdown with all openai models as options -->
			<div class="col-span-full">
				<label
					for="model"
					class="block text-sm font-medium leading-6 text-gray-900"
					>Model</label
				>
				<div class="mt-2">
					<select
						id="model"
						name="model"
						class="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6"
					>
						<option value="gpt-4o-mini">gpt-4o-mini</option>
						<option value="gpt-4o">gpt-4o</option>
						<option value="gpt-4-turbo">gpt-4-turbo</option>
						<option value="gpt-4">gpt-4</option>
					</select>
				</div>
			</div>

			<div class="col-span-full">
				<label
					for="cover-photo"
					class="block text-sm font-medium leading-6 text-gray-900"
					>Add files</label
				>
				<div
					class="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25"
				>
					<div class="text-center">
						
						<svg
							class="w-12 h-12 mx-auto text-gray-400"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								class="w-9 h-9"
								d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
							/>
						</svg>
						<div class="flex mt-4 text-sm leading-6 text-gray-600">
							<label
								for="file-upload"
								class="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
							>
								<span>Upload a file</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									class="sr-only"
								/>
							</label>
							<p class="pl-1">or drag and drop</p>
						</div>
						<p class="text-xs leading-5 text-gray-600">
							PDFs, Images, JSON files up to 10MB
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
