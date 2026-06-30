<div
    id="{{ $id }}"
    class="ndp-laravel-converter {{ $class }}"
    {{ $attributes }}
></div>

@once
@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.NepaliConverterWidget === 'undefined') return;
    new window.NepaliConverterWidget('#{{ $id }}', {
        theme: '{{ $theme }}',
        lang:  '{{ $lang }}',
    });
});
</script>
@endpush
@endonce
